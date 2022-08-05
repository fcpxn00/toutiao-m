import request from '@/utils/request'

/**
 * 搜索建议API
 * @param {String} q 搜索关键词
 * @returns Promise
 */
export const getSearchSuggestionApi = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: { q }
  })
}
