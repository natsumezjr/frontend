// src/composables/useAuth.js
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { validateRegistrationForm, validateLoginForm } from '@/utils/validation'; // 引入验证函数

const URL = 'http://localhost:18000/';
const API_URL = `${URL}users/`;

export const useAuth = () => {
  const router = useRouter();
  const store = useUserStore();

  // 获取 CSRF 令牌的函数
  const getCSRFToken = async () => {
    try {
        const res = await axios.get(`${URL}csrf/`, { withCredentials: true });
        return res.data.csrftoken;
    } catch (error) {
        console.error('获取 CSRF 令牌失败：', error);
        ElMessage.error('获取 CSRF 令牌失败');
        return null;
    }
  };

  // 注册函数
  const register = async (form) => {
    // 使用外部的表单验证逻辑
    const errors = validateRegistrationForm(form);
    
    // 进行错误检测
    if (errors.username || errors.password || errors.confirmPassword || errors.email) {
      Object.values(errors).forEach(error => {
        if (error) ElMessage.error(error); // 显示相应的错误信息
      });
      return false; // 注册失败
    }

    // 继续执行注册的 API 调用...
    try {
      const csrftoken = await getCSRFToken();
      if (!token) return false; // 获取 CSRF 令牌失败，注册失败

      const formData = new URLSearchParams();
      formData.append('username', form.username);
      formData.append('password', form.password);
      formData.append('email', form.email);
      formData.append('identity', form.identity);

      const res = await axios.post(`${API_URL}register/`, formData, {
        headers: {
          'X-CSRFToken': csrftoken,
        },
        withCredentials: true,
      });

      if (res.data.code === 201) {
        router.push("/login");
        ElMessage.success('注册成功');
        return true; // 注册成功
      } else {
        ElMessage.error(res.data.error);
        return false; // 注册失败
      }
    } catch (error) {
      ElMessage.error('注册请求失败，请重试。');
      return false; // 请求失败
    }
  };

  // 登录函数
  const login = async (form) => {
    // 使用外部的表单验证逻辑
    const errors = validateLoginForm(form);

    // 进行错误检测
    if (errors.username || errors.password) {
      Object.values(errors).forEach(error => {
        if (error) ElMessage.error(error); // 显示相应的错误信息
      });
      return false; // 登录失败
    }

    // 继续执行登录的 API 调用...
    try {
      const csrftoken = await getCSRFToken();
      const formData = new URLSearchParams();
      formData.append('username', form.username);
      formData.append('password', form.password);
      formData.append('identity', form.identity);

      const res = await axios.post(`${API_URL}login/`, formData, {
        headers: {
          'X-CSRFToken': csrftoken,
        },
        withCredentials: true,
      });

      if (res.data.code === 200) {
        store.loginUser(form.username, form.identity);
        router.push(form.identity === "student" ? "/student" : "/teacher");
        ElMessage.success('登录成功');
        return true; // 登录成功
      } else {
        ElMessage.error(res.data.error);
        return false; // 登录失败
      }
    } catch (error) {
      ElMessage.error('登录请求失败，请重试。');
      return false; // 请求失败
    }
  };

  // 退出登录函数
  const logout = async () => {
    const csrftoken = await getCSRFToken(); // 获取 CSRF 令牌
    store.clearUser(); // 清除用户状态
    
    try {
      // 发送登出请求
      const res = await axios.post(`${API_URL}logout/`, null, {
        headers: {
          'X-CSRFToken': csrftoken, // 在请求头中添加 CSRF 令牌
        },
        withCredentials: true,
      });
  
      // 根据返回的 code 判断登出是否成功
      if (res.data.code === 200) {
        ElMessage.success('登出成功');
        store.clearUser(); // 确保清除用户状态
        router.push('/login'); // 导航到登录页面
      } else {
        ElMessage.error('登出失败: ' + res.data.error);
      }
    } catch (error) {
      ElMessage.error('登出请求失败: ' + error.message);
    }
  };
  

  return {
    register,
    login,
    logout,
  };
};

  
