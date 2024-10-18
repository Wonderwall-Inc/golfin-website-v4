
type LanguageCode = 'en' | 'ja'
type LocaleCode = 'en-us' | 'ja'

export const urlLocaleToLangCodeMap = new Map<LocaleCode, LanguageCode>([
 [
  'en-us', 'en'
 ],
 [
  'ja', 'ja'
 ]
])

export const langCodeToUrlLocaleMap = new Map<LanguageCode, LocaleCode>([
 [
  'en', 'en-us'
 ],
 [
  'ja', 'ja'
 ]
])
