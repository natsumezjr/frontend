<template>
    <div class="second-line-container">
        <div class="glowing-icon-container">
          <svg aria-hidden="true" height="36" viewBox="0 0 24 24" width="36">
            <path fill="white" d="M7.5 1.75C7.5.784 8.284 0 9.25 0h5.5c.966 0 1.75.784 1.75 1.75V4h4.75c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0 1 21.25 22H2.75A1.75 1.75 0 0 1 1 20.25V5.75C1 4.784 1.784 4 2.75 4H7.5Zm-5 10.24v8.26c0 .138.112.25.25.25h18.5a.25.25 0 0 0 .25-.25v-8.26A4.235 4.235 0 0 1 18.75 13H5.25a4.235 4.235 0 0 1-2.75-1.01Zm19-3.24v-3a.25.25 0 0 0-.25-.25H2.75a.25.25 0 0 0-.25.25v3a2.75 2.75 0 0 0 2.75 2.75h13.5a2.75 2.75 0 0 0 2.75-2.75Zm-6.5-7a.25.25 0 0 0-.25-.25h-5.5a.25.25 0 0 0-.25.25V4h6Z"></path>
          </svg>
      </div>
      <div class="gradient-line"></div>
    </div>
</template>

<script setup>
import { defineComponent } from 'vue'

defineComponent({
  name: 'SecondLine'
})
</script>

<style scoped>
/* 闪光图标容器的样式 */
.glowing-icon-container {
    position: relative; /* 为其子元素提供定位上下文 */
    margin-bottom: 20px; /* 使其提升与线条的对齐 */
    border-radius: 50%; /* 使其为圆形 */
    box-shadow: 0 4px 20px rgba(154, 199, 255, 0.219); /* 添加阴影效果 */
}

/* 整体容器的样式 */
.second-line-container {
    display: flex;
    flex-direction: column; /* 垂直排列子元素 */
    align-items: center; /* 水平居中对齐 */
    padding: 20px; /* 添加内边距 */
    position: relative; /* 为绝对定位的子元素提供定位上下文 */
}

/* 渐变线样式 */
.gradient-line {
    background: linear-gradient(to bottom, #7C72FF 30%, #65dffa);
    width: 4px; /* 设置线条宽度 */
    height: 360px; /* 设置线条高度 */
    margin: 0; /* 移除上下间距，以便线条居中对齐 */
}
</style>
