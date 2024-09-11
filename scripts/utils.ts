import { readFileSync, writeFileSync } from 'fs'

export type LangConfig = {
  langDir: string
  defaultLang: string
  langs: string[]
}

export const readJson = <T>(pathName: string): T => {
  return JSON.parse(readFileSync(pathName, 'utf8'))
}

export const sortObjectKeys = (
  obj: Record<string, any>
): Record<string, any> => {
  return Object.keys(obj)
    .sort()
    .reduce((result: Record<string, any>, key: string) => {
      result[key] = obj[key]
      return result
    }, {})
}

export const writeJson = (pathName: string, obj: Record<string, any>): void => {
  writeFileSync(pathName, JSON.stringify(sortObjectKeys(obj), null, 2))
}
