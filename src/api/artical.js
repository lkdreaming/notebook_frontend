import request from '@/util/request'

export function detail(id) {
    return request({
        url: '/article/detail',
        method: 'get',
        params: {
            id
        }
    })
}