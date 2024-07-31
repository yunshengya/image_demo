<template>
  <a-layout style="background: #ffffff;">
    <a-layout-header class="layout_header">
      <div class="layout_header_left">
        <a-avatar :size="36" :src="store.avatar" alt="USER"></a-avatar>
        <div class="layout_header_left_content">
          <!-- <span class="layout_welcome">欢迎，</span> -->
          <span class="layout_name">{{store.username}}</span>
        </div>
      </div>
      <div class="layout_header_content" @click="onExit">退出登录</div>
    </a-layout-header>
    <a-layout-sider :style="{ position: 'fixed', left: 0 ,height:'100% ',marginTop:'64px'}" breakpoint="lg">
      <a-menu theme="dark" mode="inline" :items="itemsList" :selectedKeys="menuSelect.selectedKeys" :openKeys="menuSelect.openKey" @select="onSelect" @click="onMenuClick">
      </a-menu>
    </a-layout-sider>
    <a-layout-content style="margin-left: 200px;margin-top: 64px;">
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
import { reactive, VueElement, h, ref } from 'vue'
import { FileImageOutlined, VideoCameraOutlined, ZhihuOutlined, SlackOutlined } from '@ant-design/icons-vue'
import { RouterEnum } from '@/application/interface/public'
import { useUserStore } from '@/store' // 确保路径正确
import type { ItemType } from 'ant-design-vue'
import router from '@/router'
const store = useUserStore()
// 菜单列表
function getItem(label: VueElement | string, key: string, icon?: any, children?: ItemType[], type?: 'group'): ItemType {
	return {
		key,
		icon,
		children,
		label,
		type,
	} as ItemType
}
const itemsList: ItemType[] = reactive([
	getItem('图片', RouterEnum.User, () => h(FileImageOutlined)),
	getItem('视频', RouterEnum.Video, () => h(VideoCameraOutlined)),
	getItem('文字', RouterEnum.Question, () => h(ZhihuOutlined)),
	getItem('AI', RouterEnum.Ai, () => h(SlackOutlined)),
])
// const itemNavSelect = reactive({
// 	selectedKeys: ['/home'],
// 	openKey: ['/home'],
// })
const menuSelect = reactive({
	selectedKeys: [router.currentRoute.value.path],
	openKey: [router.currentRoute.value.path],
})
const onSelect = (e: any) => {
	router.push({ path: e.selectedKeys[0] })
	menuSelect.selectedKeys = e.selectedKeys
	menuSelect.openKey = e.openKeys
}
const onMenuClick = (obj: any) => {
	router.push({ path: obj.key })
}
const onExit = () => {
	store.clearUser()
	router.push(RouterEnum.Login)
}
// const onSelectNav = (e: any) => {
// 	itemNavSelect.selectedKeys = e.selectedKeys
// 	itemNavSelect.openKey = e.openKeys
// }
// 禁止f12
document.onkeydown =
	document.onkeyup =
	document.onkeypress =
		function (event) {
			var e = event || window.event || arguments.callee.caller.arguments[0]

			if (e && e.keyCode == 123) {
				e.returnValue = false
				return false
			}
		}
// 禁止鼠标右键
document.oncontextmenu = function (event) {
	event.preventDefault()
}

let collapsed = ref(false)
</script>
<style scoped lang="scss">
@import 'style.scss';
</style>