// src/composables/useInfo.js
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';
import axios from 'axios';

const URL = 'http://localhost:18000/';
const API_URL = `${URL}dashboard/`;

export const useInfo = () => {
    const router = useRouter();
    const userStore = useUserStore();
    const csrftoken = ref('');

    // 获取 CSRF 令牌的函数
    const getCSRFToken = async () => {
        try {
            const res = await axios.get(`${URL}csrf/`, { withCredentials: true });
            csrftoken.value = res.data.csrftoken;
        } catch (error) {
            console.error('获取 CSRF 令牌失败：', error);
            ElMessage.error('获取 CSRF 令牌失败');
        }
    };

    const fetchUserInfo = async (userData, form, defaultAvatarUrl) => {
        try {
            await getCSRFToken();
            const res = await axios.post(`${API_URL}userinfo/`, {}, {
                headers: {
                    'X-CSRFToken': csrftoken.value,
                },
                withCredentials: true,
            });
            if (res.data) {
                userData.value = {   // 更新用户数据
                    username: res.data.data.username,
                    avatar: res.data.data.avatar || defaultAvatarUrl,
                    first_name: res.data.data.first_name,
                    last_name: res.data.data.last_name,
                    userId: res.data.data.userId,
                    phone: res.data.data.phone,
                    email: res.data.data.email,
                  };
                  form.value = {      // 更新表单数据
                    first_name: res.data.data.first_name,
                    last_name: res.data.data.last_name,
                    userId: res.data.data.userId,
                    phone: res.data.data.phone,
                    email: res.data.data.email,
                  };
                  console.log('用户信息更新成功:', userData.value);
            }
        } catch (error) {
            console.error('获取用户信息失败:', error);
        }
    };

    return {
        fetchUserInfo,
    };
}
