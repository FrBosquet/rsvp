/* eslint-disable prettier/prettier */
import { exec } from 'child_process';
import path from 'path';

import { logger } from '@/lib/server/logger';

import { LangConfig, readJson, sortObjectKeys, writeJson } from './utils';

function convertToCamelCase(input: string): string {
  const parts = input.split('.');
  const [firstPart, secondPart] = parts;
  const capitalizedSecondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
  return firstPart + capitalizedSecondPart;
}

logger.info('Looking for usage of t(*)...')
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

const componentsDir = path.join(currentDirectory, 'components')

// eslint-disable-next-line quotes
const pattern = `"\\bt\\([\\'](.*?)[\\']\\)"`

// eslint-disable-next-line quotes
const command = `egrep -r ${pattern} ${componentsDir}`

exec(command, (error, stdout, stderr) => {
  if (error) {
    logger.error(`Error executing grep: ${error.message}`)
    return
  }
  if (stderr) {
    logger.error(`grep stderr: ${stderr}`)
    return
  }

  let added = 0

  stdout.split('\n').forEach(line => {
    const [file, text] = line.split(':')

    const match = text?.match(/t\('(.*?)\'\)/)

    if (!match) return

    let key = match[1],
      content = ''

    if (key in defaultLang) {
      return
    }

    added++

    if (key.includes('->')) {
      let [newKey, newContent] = key.split('->')

      if (newKey in defaultLang) {
        logger.error(`Key ${newKey} already exists and trying rewrite. Check ${newKey} in ${file}`)
        logger.whisper('Using previous value...')
        exec(`sed -i 's/${key}/${newKey}/g' ${file}`)
        return
      }

      // Detect if content has any characters beetween curly braces, like {user.name}
      const hasCurlyBraces = newContent.match(/{.*?}/)
      if (hasCurlyBraces) {
        const replacements = hasCurlyBraces.map(key => key.replace(/[{}]/g, ''))

        logger.whisper(replacements)

        let valuesObj = '{'

        replacements.forEach(replacement => {
          const key = convertToCamelCase(replacement)
          valuesObj += ` ${key}: ${replacement}, `
          newContent = newContent.replace(`{${replacement}}`, `{{${key}}}`)
        })

        valuesObj += '}'

        exec(`sed -i "s/${key}')/${newKey}',${valuesObj})/g" ${file}`)
      } else {
        exec(`sed -i 's/${key}/${newKey}/g' ${file}`)
      }

      key = newKey
      content = newContent
    }

    defaultLang[key] = content
  }, [])

  if (!added) {
    logger.info('No new keys found')
    return
  } else {
    logger.info(`${added} new keys found`)
    logger.whisper('Writing new keys to default lang...')

    writeJson(defaultLangPathname, sortObjectKeys(defaultLang))

    exec('pnpm run lint --fix')
  }

  logger.success('Done!')
})
