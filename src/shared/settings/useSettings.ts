import { useStorage } from '@vueuse/core'
import { KEY_STORAGE_SETTINGS, DEFAULT_SETTINGS } from './config'

export const useSettings = () => {
    return useStorage(KEY_STORAGE_SETTINGS, DEFAULT_SETTINGS, localStorage, { mergeDefaults: true })
}