<template>
  <NavBar title="网络安全实验中心 - 首页"/>
  <div class="content">
    <el-container class="title-container">
      <el-main>
        <h1 class="title" :class="{ 'fade-in': isTitleVisible }" ref="titleRef">
          网络安全实验中心
        </h1>
      </el-main>
    </el-container>

    <div class="flex-container">
      <FirstLine class="line" />
      <el-container class="intro-container">
        <el-aside width="500px">
          <el-carousel :interval="4000" height="360px">
            <el-carousel-item v-for="(image, index) in introImages.list" :key="index">
              <img :src="image" alt="图片资源加载异常" class="IntroImages" />
            </el-carousel-item>
          </el-carousel>
        </el-aside>
        <el-main class="intro-main">
          <h2 class="intro-title" v-html="animatedTitle"></h2>
          <p class="intro-content" v-html="animatedContent"></p>
        </el-main>
      </el-container>
    </div>

    <div class="flex-container">
      <SecondLine class="line" />
      <el-container class="experiment-card-container">
        <el-header>
          <h2 class="experiment-card-title">实验卡片</h2>
        </el-header>
        <el-main>
          <p class="experiment-card-content">实验卡片将展示实验课程的相关信息，包括课程名称、实验目的、实验内容、实验要求、实验难度等。</p>
          <el-card class="experiment-card" shadow="hover" v-for="(card, index) in ExperimentCards" :key="index"></el-card>
        </el-main>
      </el-container>
    </div>


  </div>
      
  <el-footer class="footer" height="60px">
    <p>© Cyber Security Experimental Center of BUPT. All rights reserved.</p>
  </el-footer>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import FirstLine from '@/components/FirstLine.vue';
import SecondLine from '@/components/SecondLine.vue';
import NavBar from '@/components/NavBar.vue';

// 定义文本
const titleText = "网络安全实验中心简介";
const introText = "网络安全实验中心致力于培养学生的网络安全意识和技术能力。我们提供多种实验课程，从基础网络安全到高级入侵检测，为学生提供全面的动手实践机会。";

// 定义响应式变量
const animatedTitle = ref('');
const animatedContent = ref('');
const isTitleVisible = ref(true);

// 定义响应式图片资源
const introImages = reactive({
  list: [
    new URL('@/assets/intro1.jpg', import.meta.url).href,
    new URL('@/assets/intro2.jpg', import.meta.url).href,
    new URL('@/assets/intro3.jpg', import.meta.url).href,
  ]
});


// 开启监听容器
const startObservecon = (selector) => {
  const contents = Array.from(document.querySelectorAll(selector));

  // 创建一个用于跟踪每个元素动画状态的对象
  const isConAnimating = {};

  // 实例化 IntersectionObserver
  let intersectionObserverInstance = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const { target, isIntersecting } = entry;

      // 判断元素是否进入视口并且没有执行过动画
      if (isIntersecting && target.getAttribute('data-has-animated') !== 'true' && !isConAnimating[target]) {
        // 执行入场动画
        isConAnimating[target] = true;
        startAnimateR(target).then(() => {
          // 设置动画状态为已执行
          target.setAttribute('data-has-animated', 'true');
          isConAnimating[target] = false;
        });
      } else if (!isIntersecting && target.getAttribute('data-has-animated') && !isConAnimating[target]) {
        target.style.opacity = "0"; // 隐藏元素
        target.setAttribute('data-has-animated', 'false'); // 重置状态
      }
    });
  }, {
    threshold: 1 // 设置阈值为1，即元素在视口中时触发动画
  });

  contents.forEach((target) => {
    target.setAttribute('data-has-animated', 'false');
    isConAnimating[target] = false;
    intersectionObserverInstance.observe(target);
  });
  return intersectionObserverInstance;
};

// 开启监听线条
const startObserveline = (selector) => {
  const contents = Array.from(document.querySelectorAll(selector));

  const isLineAnimating = {};

  let intersectionObserverInstance = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const { target, isIntersecting } = entry;

      if (isIntersecting && target.getAttribute('data-has-animated') !== 'true' && !isLineAnimating[target]) {
        isLineAnimating[target] = true;
        startAnimateD(target).then(() => {
          target.setAttribute('data-has-animated', 'true');
          isLineAnimating[target] = false;
        });
      } else if (!isIntersecting && target.getAttribute('data-has-animated') && !isLineAnimating[target]) {
        target.style.opacity = "0"; // 隐藏元素
        target.setAttribute('data-has-animated', 'false'); // 重置状态
      }
    });
  }, {
    threshold: 1 // 设置阈值为1，即元素在视口中时触发动画
  });

  contents.forEach((target) => {
    target.setAttribute('data-has-animated', 'false');
    isLineAnimating[target] = false;
    intersectionObserverInstance.observe(target);
  });
  return intersectionObserverInstance;
};

// 开始动画（右浮现）
const startAnimateR = (target) => {
  return new Promise((resolve) => {
    target.style.opacity = "1";

    const newspaperSpinning = [
      {
        transform: `translate(20px, 0px) scale(1)`,
        opacity: 0,
      },
      { transform: "translate(0px, 0px) scale(1)" },
    ];

    const newspaperTiming = {
      duration: 500,
      iterations: 1,
    };

    const animation = target.animate(newspaperSpinning, newspaperTiming);
    
    animation.onfinish = () => {
      resolve();
    };
  });
};

// 开始动画（从顶部逐渐可见）
const startAnimateD = (target) => {
  return new Promise((resolve) => {
    target.style.opacity = "1";

    const newspaperSpinning = [
      {
        clipPath: 'inset(0% 0% 100% 0%)',
        opacity: 1
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1
      },
    ];

    const newspaperTiming = {
      duration: 500,
      iterations: 1,
    };

    const animation = target.animate(newspaperSpinning, newspaperTiming);

    animation.onfinish = () => {
      resolve();
    };
  });
};

// 文本动画函数
const animateText = async (text, refVariable) => {
  const chars = text.split('');
  refVariable.value = '';
  for (let index = 0; index < chars.length; index++) {
    await new Promise((resolve) => {
      setTimeout(() => {
        refVariable.value += chars[index];
        resolve();
      }, 100);
    });
  }
};

let intersectionObservercon;
let intersectionObserverline;

// 组件挂载
onMounted(async () => {
  console.log(introImages.list); // 打印 introsImages 列表到控制台
  intersectionObservercon = startObservecon('.experiment-card-container');
  intersectionObserverline = startObserveline('.line');
  await animateText(titleText, animatedTitle);
  await animateText(introText, animatedContent);
});


// 组件卸载时移除事件监听
onBeforeUnmount(() => {
  intersectionObservercon.disconnect();
  intersectionObserverline.disconnect();
});
</script>



<style scoped>
.content {
  background-image: url('@/assets/HomePage.jpg'); /* 设置背景图 */
  background-attachment: fixed; /* 背景图固定 */
  background-position: center; /* 背景图居中 */
  background-repeat: no-repeat; /* 不重复背景图 */
  margin: 0;
  padding: 0;
  border-radius: 10px;
}

.title-container {
  display: flex; /* 使用 flex 布局来居中内容 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  padding: 30px 0; /* 简化padding */
}

.title {
  font-size: 96px; 
  opacity: 1;
  transform: translateY(50px);
  transition: opacity 1s ease, transform 1s ease; /* 设置过渡效果 */
  background: linear-gradient(90deg, #6cc5f9, #de9aed); /* 使用渐变色 */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  position: relative;
  text-align: center; 
  padding: 20px 0; /* 简化padding */
}

.title.fade-in {
  opacity: 1;
  transform: translateY(0);
}

.flex-container {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: stretch; /* 垂直方向对齐 */
  background: radial-gradient(circle, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.5) 100%);
  padding-bottom: 360px;
}

.line {
  padding-left: 60px;
  padding-top: 60px;
  opacity: 0; /* 初始不可见 */
  transition: opacity 1s ease; /* 添加过渡效果 */
}

.intro-container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 60px;
}


.IntroImages {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
}

.intro-main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  padding-left: 60px;
}

.intro-title {
  font-size: 48px;
  color: #FFFFFF;
  padding-bottom: 20px;
}

.intro-content {
  font-size: 24px;
  color: #FFFFFF;
  padding-bottom: 20px;
}

.experiment-card-container {
  display: flex;
  flex-direction: column; /* 改成纵向排列 */
  justify-content: flex-start;
  align-items: flex-start;
  padding: 60px;
  opacity: 0; /* 初始不可见 */
  transition: opacity 1s ease; /* 添加过渡效果 */
}

.experiment-card-title {
  font-size: 48px;
  color: #FFFFFF;
  padding-bottom: 20px;
}

.experiment-card-content {
  font-size: 24px;
  color: #FFFFFF;
  padding-bottom: 20px;
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
