
import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

// eslint-disable-next-line no-console
console.log('Syncing translations...')

const pathName = path.join(__dirname, '../lib/translator/lang')

const defaultLang = JSON.parse(readFileSync(path.join(pathName, 'es.json'), 'utf8'))
const enLang = JSON.parse(readFileSync(path.join(pathName, 'en.json'), 'utf8'))

for (const key in defaultLang) {
  if (!enLang[key]) {
    console.log(`Adding mising key '${key}' to en.json`)
    enLang[key] = defaultLang[key]
  }
}

// Function to sort object keys
const sortObjectKeys = (obj: Record<string, any>): Record<string, any> => {
  return Object.keys(obj).sort().reduce((result: Record<string, any>, key: string) => {
    result[key] = obj[key];
    return result;
  }, {});
};


// Write sorted values to the default lang
writeFileSync(path.join(pathName, 'es.json'), JSON.stringify(sortObjectKeys(defaultLang), null, 2))

// Write sorted values to the en lang
writeFileSync(path.join(pathName, 'en.json'), JSON.stringify(sortObjectKeys(enLang), null, 2))

console.log('Translations synced!')