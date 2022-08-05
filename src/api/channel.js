import request from '@/utils/request'
import storage from '@/utils/storage'

export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 *  获取所有频道
 * @returns Promise
 */
export const getAllChannel = () => {
  return request({
    url: '/v1_0/channels'
  })
}

export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

/**
 * 添加频道api
 * @param {*} id 频道id
 * @param {*} seq 要插入到数组的位置
 * @returns Promise
 */
export const addChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'
export const setMyChannelToLoacl = (myChannel) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS, myChannel)
}
export const getMyChannelByLoacl = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}
