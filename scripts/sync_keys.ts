import OpenAI from 'openai'
import path from 'path'

const openai = new OpenAI()

import { logger } from '@/lib/server/logger'

import { LangConfig, readJson, sortObjectKeys, writeJson } from './utils'

logger.info('Looking for intl keys...')
logger.whisper('Loading config...')

const currentDirectory = process.cwd()
const configPathName = path.join(currentDirectory, 'intl.config.json')
const config = readJson<LangConfig>(configPathName)

if (!config) {
  logger.error('Config file not found')
  process.exit(1)
}

logger.whisper('Config loaded!')
logger.whisper('Loading default lang...')

const langDirPathname = path.join(currentDirectory, config.langDir)
const defaultLangPathname = path.join(
  langDirPathname,
  `${config.defaultLang}.json`
)

const defaultLang = readJson<Record<string, string>>(defaultLangPathname)

logger.whisper('Default lang loaded!')

const langs = config.langs.filter((lang) => lang !== config.defaultLang)

const processLanguages = async () => {
  let promptTokens = 0
  let completionTokens = 0

  for (const langKey of langs) {
    logger.info(`\n> Checking \x1b[33m${langKey}\x1b[0m...`)
    const langPathname = path.join(langDirPathname, `${langKey}.json`)

    let langFile: Record<string, string>

    try {
      langFile = readJson<Record<string, string>>(langPathname)
    } catch (e) {
      logger.error(
        `Error reading ${langKey}.json, or file does not exist. Defaulting to empty object.`
      )
      langFile = {}
    }

    let missingKeys: Record<string, string> = {}

    for (const key in defaultLang) {
      if (!langFile[key]) {
        logger.whisper(`Adding missing key '${key}' to ${langKey}.json`)
        missingKeys[key] = defaultLang[key]
      }
    }

    const missingKeysCount = Object.keys(missingKeys).length
    if (missingKeysCount > 0) {
      logger.whisper(`${missingKeysCount} untranslated keys found`)
      logger.whisper('Translating using gpt-4o-mini...')

      const result = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: `You are an expert translator. You are going to receive a JSON structure including keys and values in a source language that you can infer from these two letters: ${config.defaultLang}. Your task is to translate the values to another language that you should infer from these two letters: ${langKey}. The output should be a JSON object with the same keys and the translated values that can be parsed using JSON.parse.`
          },
          {
            role: 'user',
            content: JSON.stringify(missingKeys)
          }
        ]
      })

      promptTokens += result.usage?.prompt_tokens ?? 0
      completionTokens += result.usage?.completion_tokens ?? 0

      if (result.choices[0]) {
        try {
          const missingTranslations = JSON.parse(
            result.choices[0].message.content as string
          )

          const fileComplete = sortObjectKeys({
            ...langFile,
            ...missingTranslations
          })

          writeJson(langPathname, fileComplete)
          logger.info(`File ${langKey}.json updated!`)
        } catch (e) {
          logger.error(`Error: ${e}`)
          logger.info(JSON.stringify(result, null, 2))
        }
      }
    } else {
      logger.info(`No untranslated keys found for \x1b[33m${langKey}\x1b[0m`)
    }
  }

  logger.info('\n\n> All languages processed!')

  logger.whisper('Sorting default lang...')

  writeJson(defaultLangPathname, sortObjectKeys(defaultLang))

  logger.info('> Default lang sorted!')

  logger.info('\n\n> Operation cost')
  const promptCost = (promptTokens * 15) / 1000000
  logger.whisper(
    `Prompt tokens: ${promptTokens}. (${promptCost.toFixed(4)}$ cents)`
  )

  const completionCost = (completionTokens * 60) / 1000000
  logger.whisper(
    `Completion tokens: ${completionTokens}. (${completionCost.toFixed(4)}$ cents)`
  )

  logger.whisper(
    `Total cost: ${(promptCost + completionCost).toFixed(4)}$ cents`
  )

  logger.info('\n\nAll done!')
}

processLanguages()
