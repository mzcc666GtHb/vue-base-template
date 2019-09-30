<template>
  <div>
    <button @click="getInTheaters">正在热映</button>
    <button @click="getComingSoon">即将上映</button>
    <div>

    </div>
  </div>

</template>

<script>
  import api from '@/api/axiosConfig'
  export default {
    name: "film",
    methods: {
      getInTheaters() {
        this.$http['filmList/in_theaters']({
          name:'张三',
          age:12
        },{
          headers:{
            'token':'1231asdfasfdsd123sd1231saa23asf'
          }
        }).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      },
      getComingSoon() {
        api['filmList/coming_soon']().then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
