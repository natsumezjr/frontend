<template>
  <el-card :class="cardClass" shadow="hover">
    <img :src="image" class="card-image" />
    <div class="card-text">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </el-card>
</template>
<script>
export default {
  name: "SectionCard",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    fadeDirection: {
      type: String,
      default: "left", // 'left' or 'right'
    },
  },
  computed: {
    cardClass() {
      return {
        "fade-in-left": this.fadeDirection === "left",
        "fade-in-right": this.fadeDirection === "right",
      };
    },
  },
};
</script>
<style>
.card-image {
  width: 400px;
  height: 400px;
  border-radius: 4px;
  object-fit: cover;
}
.card-text {
  text-align: center;
  margin-top: 10px;
}
.fade-in-left {
  animation: fadeInLeft 0.8s ease forwards;
}
.fade-in-right {
  animation: fadeInRight 0.8s ease forwards;
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
