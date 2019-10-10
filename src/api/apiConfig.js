/**
 * @Description: 按照领域模型对api分类 this.$http['filmList/in_theaters'](params).then(res=>{})
 * @author  shangguanqingyun
 * @date 2019/4/15
*/

export default {
  filmList: [
    {
      name: 'in_theaters',
      method: 'GET',
      path: '/movie/in_theaters'
    },
    {
      name: 'coming_soon',
      method: 'GET',
      path: '/movie/coming_soon'
    },
    {
      name:'top250',
      method:'GET',
      path:'/movie/top250'
    }
  ],
  search: [
    {
      name: 'search',
      method: 'GET',
      path: '/movie/search',
      params: {
        '123123': '123123123'
      }
    }
  ],
}

