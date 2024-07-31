<template>
  <div class="box">
    <!-- <a-breadcrumb>
      <template>
        
      </template>
      <a-breadcrumb-item v-for="(item, index) in routesList" :key="index">{{ item.name }}</a-breadcrumb-item>
    </a-breadcrumb> -->
    <div class="box_content" v-if="route.path === '/index/user'">
      <div class="box_content_cell">
        <div v-for="(item, index) in appList" :key="index" class="box_content_cell_item">
          <appCell :app="item" />
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { axiosImgRand, axiosRand } from '@/application/server/axiosApi/axiosApi'
import { onMounted, reactive } from 'vue'
import appCell from './_component/app_cell.vue'
import { RouterEnum } from '@/application/interface/public'
import { routes } from '@/router'
import { useRoute } from 'vue-router'

const route = useRoute()

// const getRouter = (route: any, routes: any, paths: any) => {
// 	console.log(route, routes, paths)
// 	return route.name
// }

const routesList = reactive<any[]>([])

const data = reactive({ rank: '' })

const getRand = () => {
	axiosRand({}).then(res => {
		if (res.status !== 200) return
		data.rank = res.data
	})
}

const getUrl = async () => {
	const data = await axiosImgRand({})
	if (data.data.success) return data.data.url
}

const appList = reactive([
	{
		name: '动漫',
		route: '',
		url: '',
		getImage: 'https://www.dmoe.cc/random.php',
		path: RouterEnum.UserImage,
	},
	{
		name: '动漫(P)',
		route: '',
		url: '',
		getImage: 'https://api.shenke.love/api/r18.php',
		path: RouterEnum.UserImage,
	},
	{
		name: '女生头像',
		route: '',
		url: '',
		getImage: 'https://api.vvhan.com/api/avatar/girl',
		path: RouterEnum.UserImage,
	},
	{
		name: '买家秀',
		route: '',
		url: '',
		getImage: 'https://api.dzzui.com/api/imgtaobao',
		path: RouterEnum.UserImage,
	},
	{
		name: 'cosplay',
		route: '',
		url: '',
		getImage: 'https://api.dzzui.com/api/cosplay',
		path: RouterEnum.UserImage,
	},
	{
		name: '动漫图片（女）',
		route: '',
		url: '',
		getImage: 'http://api.dzzui.com/api/dongmannv',
		path: RouterEnum.UserImage,
	},
	{
		name: 'baisi',
		route: '',
		url: '',
		params: 'return=302',
		getImage: 'https://v2.api-m.com/api/baisi',
		path: RouterEnum.UserImage,
	},
	{
		name: 'heisi',
		route: '',
		url: '',
		params: 'return=302',
		getImage: 'https://v2.api-m.com/api/heisi',
		path: RouterEnum.UserImage,
	},
	{
		name: 'wallpaper',
		route: '',
		url: '',
		params: 'return=302',
		getImage: 'https://v2.api-m.com/api/wallpaper',
		path: RouterEnum.UserImage,
	},
	{
		name: 'head',
		route: '',
		url: '',
		params: 'return=302',
		getImage: 'https://v2.api-m.com/api/head',
		path: RouterEnum.UserImage,
	},
	{
		name: 'pcGirl',
		route: '',
		url: '',
		params: '',
		getImage: 'https://api.vvhan.com/api/wallpaper/pcGirl',
		path: RouterEnum.UserImage,
	},
	{
		name: 'mobileGirl',
		route: '',
		url: '',
		params: '',
		getImage: 'https://api.vvhan.com/api/wallpaper/mobileGirl',
		path: RouterEnum.UserImage,
	},
	{
		name: 'meizi',
		route: '',
		url: '',
		params: 'type=image',
		getImage: 'https://api.shenke.love/api/meizi.php',
		path: RouterEnum.UserImage,
	},
	{
		name: 'mjx',
		route: '',
		url: '',
		params: 'type=image',
		getImage: 'https://api.shenke.love/api/mjx.php',
		path: RouterEnum.UserImage,
	},
])

const updateAppListUrls = async () => {
	for (const item of appList) {
		item.url = await getUrl()
	}
}

onMounted(() => {
	// getRand()
	updateAppListUrls()
	// console.log(appList)

	const homeRoute = routes.find(v => v.name === '首页')
	if (homeRoute) {
		const userRoute = homeRoute.children?.find(v => v.name === '用户')
		if (userRoute) {
			routesList.push(userRoute)
		}
	}
})
</script>

<style lang="scss" scoped>
.box {
	height: 100%;
	overflow: auto;
	width: 100%;

	&_content {
		padding: 16px;
	}

	&_content_cell {
		display: flex;
		flex-wrap: wrap;
		margin: 2px;
		&_item {
			margin: 6px 12px;
		}
	}
}
</style>
