<template>
  <div class="login-container">
    <div class="login-box">
      <h3>登录页面</h3>
      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <input type="text" v-model="username" placeholder="用户名" required />
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="密码" required />
        </div>
        <button type="submit">登录</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/store' // 确保路径正确
import router from '@/router'
import { RouterEnum } from '@/application/interface/public'

const userStore = useUserStore()
onMounted(() => {
	if (userStore.userId) {
		router.push(RouterEnum.Index)
	}
})
// 定义响应式变量
const username = ref('admin')
const password = ref('password')
const errorMessage = ref('')

// 提交表单
const onSubmit = () => {
	// 这里可以添加更多的验证逻辑，例如请求后台API验证用户名和密码
	if (username.value === 'admin' && password.value === 'password') {
		// 登录成功，设置用户信息并跳转到主页
		userStore.setUserId('unique-user-id')
		userStore.setUserCredentials(username.value, password.value)
    userStore.setUserAvatar('https://v2.api-m.com/api/head?return=302')
		router.push(RouterEnum.Index)
	} else {
		// 登录失败，显示错误信息
		errorMessage.value = '用户名或密码错误'
	}
}
</script>

<style lang="scss" scoped>
.login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background: linear-gradient(45deg, #add8e6, #ffb6c1);
	background-size: cover;
	background-position: center;
}

.login-box {
	background: rgba(255, 255, 255, 0.8);
	padding: 2rem;
	border-radius: 12px;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
	text-align: center;
	width: 100%;
	max-width: 400px;
}

.login-box h3 {
	margin-bottom: 2rem;
	color: #333;
}

.input-group {
	margin-bottom: 1.5rem;
}

.input-group input {
	width: 100%;
	padding: 0.75rem;
	border: 1px solid #ddd;
	border-radius: 8px;
	font-size: 1rem;
	background-color: rgba(255, 255, 255, 0.8);
}

.input-group input::placeholder {
	color: #aaa;
}

button {
	width: 100%;
	padding: 0.75rem;
	background: #007bff;
	color: white;
	border: none;
	border-radius: 8px;
	font-size: 1rem;
	cursor: pointer;
	transition: background 0.3s;
}

button:hover {
	background: #0056b3;
}

.error {
	color: red;
	margin-top: 1rem;
}
</style>
