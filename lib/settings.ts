import { type SETTING, type SettingMap } from '@/types'

export const getSettingsMap = (raw: Array<{ type: SETTING, value: string }>): SettingMap => {
  return raw.reduce<SettingMap>((acc, setting) => {
    acc[setting.type] = setting.value
    return acc
  }, {})
}
