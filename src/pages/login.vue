
<template>
  <div class="box">
    <h3>登录页面</h3>
    <div class="box_login">

    </div>
  </div>
</template> 
<script lang="ts" setup>
import router from "@/router";
// 默认路由跳转
router.push({
	name: 'Index/User',
})
</script>
<style lang="scss" scoped>
@import '@/public/css/login.scss';
</style>
