import request from '@/utils/request'

/**
 * 获取文章内容API
 * @param {*} channelId 频道的id
 * @param {*} timestamp 请求第一页数据传当前时间戳，请求上一页数据传上一页时间戳
 * @returns Promise
 */
export const getArticlesApi = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
