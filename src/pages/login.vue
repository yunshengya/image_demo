
<template>
  <div class="box">
    <h3>登录页面</h3>
    <div class="box_login">

    </div>
  </div>
</template> 
<script lang="ts" setup>
import router from '@/router'
// 默认路由跳转
router.push({
	name: 'Index/User',
})
</script>
<style lang="scss" scoped>
.box {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background: linear-gradient(45deg, #add8e6, #ffb6c1);
}
</style>
