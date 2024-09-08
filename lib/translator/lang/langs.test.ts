import en from './en.json'
import es from './es.json'

// ES is the default language
const referenceKeys = Object.keys(es)

describe('all langs are complete', () => {
  describe('en', () => {
    it.each(referenceKeys)('has key %s', (key) => {
      expect(en[key as keyof typeof en]).toBeDefined()
    })
  })
})
