
<template>
  <div @click="routerTo(app.path)" class="app_cell">
    <img :src='app.url' />
    <p class="app_cell_title">{{ app.name }}</p>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
const prop = defineProps({
	app: {
		type: Object,
		default: () => ({}),
	},
})

const router = useRouter()
const routerTo = (path: any) => {
	// 使用路由 push 方法并传递参数
	router.push({
		path,
		query: {
			app: JSON.stringify(prop.app),
		},
	})
}
</script>
<style lang="scss">
@import '@/assets/css/pages/content/user/_component/app_cell.scss';
</style>