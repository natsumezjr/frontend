<template>
  <div id="app">
    <!-- 当前路由对应的页面组件会在这里渲染 -->
    <el-main class="main-content">
      <router-view></router-view>
    </el-main>
    
    <el-footer class="footer" height="60px">
      <p>© Cyber Security Experimental Center of BUPT. All rights reserved.</p>
    </el-footer>
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

.footer {
  position: fixed; /* 固定定位 */
  bottom: 0; /* 固定在底部 */
  left: 0; /* 从左侧开始 */
  right: 0; /* 向右延展 */
  display: flex; /* 使用flexbox布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  background-color: #0A0A0A;
  padding: 20px;
  color: #c9d1d9;
  text-align: center;
}

</style>
