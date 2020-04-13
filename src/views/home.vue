<template>
  <div class="main-box">
    <ul class="main-list">
      <li class="main-list-item">
        <Tab :list="list" @tabClick="tabClick"></Tab>
        {{text}}
      </li>
    </ul>

  </div>
</template>

<script>
  import Tab from '@/components/tab'

  export default {
    name: "home",
    data() {
      return {
        list: [
          {
            name: '新闻',
            active:true
          },
          {
            name: '体育'
          },
          {
            name: '娱乐'
          },
          {
            name: '军事'
          }
        ],
        text: ''
      }
    },
    components: {
      Tab
    },
    created() {
      this.list.forEach((item, index) => {
        if (item.active) {
          this.text = item.name
        }
      });
    },
    methods: {
      tabClick(data) {
        this.text = data.name + 'buyongpa'
      }
    }
  }
</script>

<style scoped>
  .main-list {
    display: flex;
    list-style: none;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  .main-list-item {
    border: 1px solid #ddd;
    margin-bottom: 20px;
    padding-top: 10px;
    width: 25%;
    height: 200px;

  }
</style>
