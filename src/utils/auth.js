import storage from './storage'

const TOKEN = 'TOUTIAO_TOKEN'

export const getToken = () => storage.get(TOKEN)

export const setToken = (value) => storage.set(TOKEN, value)

export const removeToken = () => storage.remove(TOKEN)
