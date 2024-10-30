<template>
  <div>
    <NavBar title="网络安全实验中心 - 首页" />
    <div class="background">
      <el-form :model="form" label-width="auto" style="max-width: 600px" class="register-form">
        <h2>注册</h2>

        <el-form-item class="form-item">
          <label>用户名：</label>
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            class="input-field"
            show-word-limit
            maxlength="16"
          ></el-input>
          <div v-if="errors.username" class="error-message">{{ errors.username }}</div>
        </el-form-item>

        <el-form-item class="form-item">
          <label>密码：</label>
          <el-input
            type="password"
            v-model="form.password"
            class="input-field"
            placeholder="请输入密码"
            show-password
            show-word-limit
            maxlength="20"
          ></el-input>
          <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </el-form-item>

        <el-form-item class="form-item">
          <label>确认密码：</label>
          <el-input
            type="password"
            v-model="form.confirmPassword"
            class="input-field"
            placeholder="请再次输入密码"
            show-password
          ></el-input>
          <div v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</div>
        </el-form-item>

        <el-form-item class="form-item">
          <label>邮箱：</label>
          <el-input
            v-model="form.email"
            class="input-field"
            placeholder="请输入邮箱"
            clearable
            maxlength="50"
          ></el-input>
          <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </el-form-item>

        <el-form-item class="form-item">
          <label>身份：</label>
          <el-radio-group v-model="form.identity">
            <el-radio :value="'student'">学生</el-radio>
            <el-radio :value="'teacher'">老师</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <div class="button-container">
            <el-button :loading="loading" type="primary" @click="handleRegister">注册</el-button>
            <el-button @click="router.push('/login')">取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import NavBar from '@/components/NavBar.vue';

// 定义表单数据
const form = ref({ 
  username: '', 
  password: '', 
  confirmPassword: '', 
  email: '', 
  identity: 'student' 
});

const loading = ref(false);

// 定义错误信息
const errors = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: ''
});

const router = useRouter();
const { register } = useAuth();

// 注册处理函数
const handleRegister = async () => {
  console.log("register:", form.value);
  loading.value = true;
  const success = await register(form.value);
  loading.value = false;
};
</script>

<style scoped>
.background {
  width: 100%;
  background-image: url("../../assets/HomePage.jpg");
  height: 100%;
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  filter: brightness(0.7);
}

.register-form {
  max-width: 600px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  border-radius: 20px;
}

h2 {
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
}

.form-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.form-item label {
  width: 80px;
  margin-right: 10px;
  text-align: right;
  color: #ffffff;
}

.input-field {
  flex: 1;
  max-width: 240px;
}

.error-message {
  color: #ff5c5c;
  font-size: 12px;
  margin-top: 5px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.el-button {
  background: rgba(30, 144, 255, 0.8);
  border: none;
  color: white;
  border-radius: 10px;
  height: 40px;
  flex: 1;
  margin: 0 5px;
}

.el-button:hover {
  background: rgba(30, 144, 255, 1);
}

.el-button:nth-child(2) {
  background: transparent;
  color: rgba(30, 144, 255, 0.8);
  border: 1px solid rgba(30, 144, 255, 0.8);
}
</style>
