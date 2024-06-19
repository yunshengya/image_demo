<template>
  <div class="box">
    <div v-if="!firstLoading" class="masonry" :style="{ columnCount: columnCount }">
      <!-- 使用v-for循环渲染图片 -->
      <div v-for="(image, index) in images" :key="index" class="masonry-item">
        <img :src="image.src" :alt="`Image ${index}`" />
      </div>
    </div>
    <!-- 加载指示器 -->
    <div ref="loading" class="loading">加载中...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 定义图像类型
interface Image {
	src: string
	width: number
	height: number
}

// 响应式数组，用于存储图像
const images = ref<Image[]>([])

const getImage = ref('') // 定义并初始化为空字符串

const params = ref('')

// 加载新图像的函数
const fetchMoreImages = () => {
	for (let i = 0; i < 10; i++) {
		const width = 100 + Math.floor(Math.random() * 100)
		const height = 100 + Math.floor(Math.random() * 100)
		const randomSuffix = Math.random().toString(36).substring(7) // 生成随机字符串作为唯一标识
		const paramsValue = params.value ? `${params.value}&rand=${randomSuffix}` : `width=${width}&height=${height}&rand=${randomSuffix}`
		const image = {
			src: `${getImage.value}?${paramsValue}`,
			width,
			height,
		}
		images.value.push(image)
	}
}

// 用于加载元素的引用
const loading = ref<HTMLElement | null>(null)
let firstLoading = ref(true)
// Intersection Observer 实例
let observer: IntersectionObserver | null = null

// 动态列数
const columnCount = ref<number>(3)

// 计算列数
const calculateColumnCount = () => {
	const containerWidth = document.querySelector('.box')?.clientWidth || window.innerWidth
	columnCount.value = Math.floor(containerWidth / 300)
}

// 设置 Intersection Observer
const setObserver = () => {
	if (!loading.value) return

	observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					fetchMoreImages()
				}
			})
		},
		{ threshold: 1.0 },
	)

	observer.observe(loading.value)
}

// 初始化加载图片
onMounted(async () => {
	await router.isReady()
	let obj = JSON.parse(router.currentRoute.value.query.app)
	getImage.value = obj.getImage as string
	if (obj?.params) params.value = obj.params
	firstLoading.value = false
	fetchMoreImages()
	setObserver()
	calculateColumnCount()
	window.addEventListener('resize', calculateColumnCount)
})

onUnmounted(() => {
	if (observer && loading.value) {
		observer.unobserve(loading.value)
	}
	window.removeEventListener('resize', calculateColumnCount)
})
</script>

<style scoped>
.box {
	width: 100%;
	padding: 20px;
}

.masonry {
	column-gap: 15px;
}

.masonry-item {
	break-inside: avoid;
	margin-bottom: 15px;
	width: 100%; /* 每张图片宽度占满其列宽 */
}

.masonry-item img {
	width: 100%;
	height: auto;
	display: block;
}

.loading {
	text-align: center;
	padding: 20px;
	font-size: 16px;
}
</style>
