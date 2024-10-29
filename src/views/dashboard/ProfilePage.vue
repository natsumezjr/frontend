<template>
  <div>
    <NavBar title="网络安全实验中心--个人中心" />
    <div class="profile-container">
      <div class="content">
        <el-card shadow="hover" class="profile-card">
          <div class="profile-header">
            <!-- 用户头像 -->
            <el-upload
              class="avatar-uploader"
              action="/api/upload-avatar"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img :src="userData.avatar" alt="用户头像" class="avatar" />
            </el-upload>

            <div class="user-info">
              <h2>{{ userData.username }}</h2>
              <!-- 编辑按钮，切换编辑模式 -->
              <el-button type="primary" @click="editMode = !editMode">
                {{ editMode ? "取消" : "编辑资料" }}
              </el-button>
            </div>
          </div>

          <!-- 用户信息表单/静态展示 -->
          <el-form :model="form" label-width="100px" class="profile-form">
            <!-- 姓名 -->
            <el-form-item label="姓名">
              <el-row>
                <el-col :span="12">
                  <el-input
                    v-model="form.first_name"
                    :disabled="!editMode"
                    placeholder="名字"
                  />
                </el-col>
                <el-col :span="12">
                  <el-input
                    v-model="form.last_name"
                    :disabled="!editMode"
                    placeholder="姓氏"
                  />
                </el-col>
              </el-row>
            </el-form-item>

            <!-- 学/教工号 -->
            <el-form-item label="学/教工号">
              <el-input
                v-model="form.userId"
                :disabled="!editMode"
                placeholder="请输入学/教工号"
              />
            </el-form-item>

            <!-- 电话 -->
            <el-form-item label="电话">
              <el-input
                v-model="form.phone"
                :disabled="!editMode"
                placeholder="请输入电话"
              />
            </el-form-item>

            <!-- 邮箱 -->
            <el-form-item label="邮箱">
              <el-input
                v-model="form.email"
                :disabled="!editMode"
                placeholder="请输入邮箱"
              />
            </el-form-item>

            <!-- 保存按钮 -->
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm"
                :disabled="!editMode"
              >
                保存
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';
import { useInfo } from '@/composables/useInfo';
const { fetchUserInfo } = useInfo();

const editMode = ref(false); // 控制是否处于编辑模式
const userData = ref({
  username: '',
  avatar: '',
  first_name: '',
  last_name: '',
  userId: '',
  phone: '',
  email: '',
});

const defaultAvatarUrl = new URL('@/assets/default_avatar.png', import.meta.url).href; 

const form = ref({
  first_name: '',
  last_name: '',
  userId: '',
  phone: '',
  email: '',
});

// 处理头像上传成功
const handleAvatarSuccess = response => {
  if (response.success && response.avatarUrl) {
    userData.value.avatar = response.avatarUrl; // 更新头像 URL
    submitAvatarUpdate(); // 将头像 URL 提交到后端
  } else {
    console.error('头像上传失败');
  }
};

// 上传前处理逻辑
const beforeAvatarUpload = file => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG) {
    alert('上传头像图片只能是 JPG/PNG 格式!');
  }
  if (!isLt2M) {
    alert('上传头像图片大小不能超过 2MB!');
  }
  return isJPG && isLt2M;
};

// 提交头像更新
const submitAvatarUpdate = async () => {
  try {
    await axios.post('/api/update-avatar', {
      avatar: userData.value.avatar,
    }, { withCredentials: true });
    alert('头像更新成功');
  } catch (error) {
    alert('头像更新失败');
    console.error('头像更新失败:', error);
  }
};

// 提交用户信息表单
const submitForm = async () => {
  try {
    await axios.post('/api/update-user-info', form.value, {
      withCredentials: true,
    });
    alert('信息更新成功');
    editMode.value = false; // 退出编辑模式
    await fetchUserInfo(userData, form, defaultAvatarUrl); // 刷新用户信息
  } catch (error) {
    alert('信息更新失败');
    console.error('信息更新失败:', error);
  }
};

// 使用 onMounted 生命周期钩子
onMounted(() => {
  fetchUserInfo(userData, form, defaultAvatarUrl); // 获取用户信息
});
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  overflow-x: hidden;
}

.content {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px;
}

.profile-card {
  width: 100%;
  max-width: 700px;
  padding: 40px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.avatar-uploader {
  width: 120px;
  height: 120px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

/* Form layout */
.profile-form {
  width: 100%;
}

.el-form-item {
  margin-bottom: 20px;
}

/* Responsive design */
@media (max-width: 768px) {
  .profile-container {
    padding-top: 60px;
  }

  .profile-card {
    padding: 20px;
  }

  .profile-header {
    flex-direction: column;
    align-items: center;
  }

  .profile-form {
    max-width: 100%;
  }
}
</style>
