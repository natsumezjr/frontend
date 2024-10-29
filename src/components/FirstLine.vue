<template>
    <div class="line-container">
      <div class="circle-border"></div>
      <div class="gradient-line"></div>
    </div>
  </template>
  
<script setup>
import { defineComponent } from 'vue';
  
defineComponent({
  name: 'FirstLine',
});
</script>
  
<style scoped>
.line-container {
    display: flex;
    flex-direction: column; /* 垂直排列子元素 */
    align-items: center; /* 水平居中对齐 */
    padding: 20px; /* 添加内边距 */
    position: relative; /* 为绝对定位的子元素提供定位上下文 */
}
  
/* 圆圈样式 */
.circle-border {
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%; /* 使其为圆形 */
    width: 36px; /* 圆圈宽度 */
    height: 36px; /* 圆圈高度 */
    margin-bottom: 10px; /* 圆圈与线条之间的间距 */
}
  
/* 渐变线样式 */
.gradient-line {
    background: linear-gradient(transparent, #7C72FF 30%);
    width: 4px; /* 设置线条宽度 */
    height: 300px; /* 设置线条高度 */
    margin: 20px 0; /* 与其他元素间隔 */
}
</style>
  