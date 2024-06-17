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

const getRouter = (route: any, routes: any, paths: any) => {
	console.log(route, routes, paths)
	return route.name
}

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
		path: RouterEnum.UserVideo,
	},
	{
		name: '女生头像',
		route: '',
		url: '',
		getImage: 'https://api.vvhan.com/api/avatar/girl',
		path: RouterEnum.UserVideo,
	},
	{
		name: '买家秀',
		route: '',
		url: '',
		getImage: 'https://api.dzzui.com/api/imgtaobao',
		path: RouterEnum.UserVideo,
	},
])

const updateAppListUrls = async () => {
	for (const item of appList) {
		item.url = await getUrl()
	}
}

onMounted(() => {
	getRand()
	updateAppListUrls()
	console.log(appList)

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
@import '@/assets/css/pages/content/user/user.scss';
</style>
