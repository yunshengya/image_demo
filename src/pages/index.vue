<template>
  <a-layout>
    <!-- 头部 -->
    <!-- <a-layout-header class="header">
      <div class="logo" style="margin-right: 230px;width: 20px;"></div>
      <a-menu :style="{ lineHeight: '64px' }" :selectedKeys="itemNavSelect.selectedKeys" @select="onSelectNav" mode="horizontal" :items="itemNav" />
    </a-layout-header> -->
    <!-- 内容 -->
    <a-layout-content>
      <a-layout style=" background: #ffffff">
        <a-layout-sider style="background: #ffffff" v-model:collapsed="collapsed" breakpoint="lg" collapsible>
          <a-menu theme="dark" :style="{ height: '100%', borderRight: 0 }" :items="itemsList" :selectedKeys="menuSelect.selectedKeys" :openKeys="menuSelect.openKey" mode="inline"
            @select="onSelect" @click="onMenuClick">
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ background:'#fff',  margin: '10px', minHeight: '280px' }">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <!-- <a-layout-footer style="text-align: center">
      © 2023北京星汉未来网络科技有限公司
    </a-layout-footer> -->
  </a-layout>
</template>
<script lang="ts" setup>
import { reactive, VueElement, h, ref } from 'vue'
import { FileImageOutlined } from '@ant-design/icons-vue'
import { RouterEnum } from '@/application/interface/public'
import type { ItemType } from 'ant-design-vue'
import router from '@/router'
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
const itemsList: ItemType[] = reactive([getItem('图片', RouterEnum.User, () => h(FileImageOutlined))])
const itemNavSelect = reactive({
	selectedKeys: ['/home'],
	openKey: ['/home'],
})
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
#components-layout-demo-top-side-2 .logo {
	float: left;
	width: 120px;
	height: 31px;
	margin: 16px 24px 16px 0;
	background: rgba(255, 255, 255, 0.3);
}
.header {
	padding-inline: 0px;
	padding-left: 250px;
	background-color: transparent;
}
.site-layout-background {
	background: #fff;
}
.ant-layout {
	position: relative;
	width: 100%;
	height: 100%;
	background: transparent;

	.ant-layout-sider {
		position: relative;
		height: 100%;
		background: transparent;
	}
}
</style>