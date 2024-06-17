<template>
  <div class="dark:bg-black dark:text-white">
    <button @click="isDark">{{model==='dark'?'正常模式':'暗色模式'}}</button>
    login
    <div class="p-10px mt-[10px] bg-hex-e62f3d32 hover:(bg-hex-a1212d font-medium text-white) text-pink-500">12</div>
    <div class="text-black dark:text-white">dark</div>
    <div @click="changename('newName')">{{store.name}}</div>
  </div>
</template> 
<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'
const store = useStore()
const router = useRouter()
let model = ref('light')
document.documentElement.classList.add('light')
let isDark = () => {
	if (document.documentElement.classList.contains('dark')) {
		document.documentElement.classList.replace('dark', 'light')
		model.value = 'light'
	} else if (document.documentElement.classList.contains('light')) {
		document.documentElement.classList.replace('light', 'dark')
		model.value = 'dark'
	} else {
		document.documentElement.classList.add('dark')
		model.value = 'dark'
	}
}
let changename = (newName: string) => {
	store.name = newName
}
// 默认路由跳转
// router.push({
// 	name: 'Index/user',
// })
</script>
