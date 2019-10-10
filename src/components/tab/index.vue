<template>
  <div>
    <ul class="tab-list">
      <li class="tab-list-item" :class="[index === tabIndex?'active':'']" v-for="(item,index)  in list" :key="index"
          @click="tabClick(item,index)">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: ['list'],
    data() {
      return {
        tabIndex: ''
      }
    },
    created() {
      this.list.forEach((item, index) => {
        if (item.active) {
          this.tabIndex = index
        }
      })
    },
    methods: {
      tabClick(data, index) {
        this.tabIndex = index
        this.$emit('tabClick', data)
      }
    }
  }
</script>

<style scoped>
  .tab-list {
    display: flex;
    list-style: none;
  }

  .tab-list-item {
    height: 40px;
    line-height: 40px;
    width: 80px;
    border: 1px solid #ddd;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }

  .tab-list-item.active {
    background-color: #eee;
  }
</style>
