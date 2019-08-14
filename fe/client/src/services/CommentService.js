import Api from '@/services/Api'

export default {
  fetchComments (params) {
    return Api().get('comments', params)
  }
}