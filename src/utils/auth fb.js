import storage from './storage fb'

const TOKEN = 'TOUTIAO_TOKEN'

export const getToken = () => storage.get(TOKEN)

export const setToken = (value) => storage.get(TOKEN, value)

export const removeToken = () => storage.get(TOKEN)
