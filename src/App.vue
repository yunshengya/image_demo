<template>
  <a-config-provider :locale="zhCN">
    <div>
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>
<style  lang="scss">
// @import '/src/resource/css/_global.scss';
$scrollbar-width: 6px; // 设置滚动条的宽度
$scrollbar-thumb-color: #b9bbbc; // 设置滚动条滑块的颜色
$scrollbar-track-color: #f5f5f5; // 设置滚动条轨道的颜色

// 全局滚动条样式
* {
	&::-webkit-scrollbar {
		width: $scrollbar-width;
		background-color: $scrollbar-track-color;
	}

	&::-webkit-scrollbar-thumb {
		background-color: $scrollbar-thumb-color;
		border-radius: 12px;
	}
}
</style>
