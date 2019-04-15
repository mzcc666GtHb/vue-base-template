import axios from  '@/api/axiosConfig'
export default  {
    install: (Vue, options) => {
      Vue.prototype.$http = axios
  }
}
