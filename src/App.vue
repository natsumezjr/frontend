<template>
  <div id="app">
    <!-- 当前路由对应的页面组件会在这里渲染 -->
    <el-main class="main-content">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script setup>
</script>


<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  overflow-x: hidden;
  font-family: "Poppins", sans-serif;
  background-color: #0A0A0A;
  color: #333;
}

#app {
  display: flex;
  flex-direction: column; /* 让子元素纵向排列 */
}

.main-content {
  flex-grow: 1;
  margin: 0; /* 去除外边距 */
  padding: 0; /* 去除内边距 */
}
</style>
