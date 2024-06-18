
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
<style lang="scss" scoped>
.app_cell {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	&:hover {
		cursor: pointer;
		transform: scale(1.2);
	}
	img {
		width: 60px;
		height: 60px;
		border-radius: 20px;
	}

	&_title {
		margin-top: 6px;
		font-size: 12px;
		color: #6a88a2;
		letter-spacing: 2px;
	}
}
</style>