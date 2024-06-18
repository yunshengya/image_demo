<template>
  <a-config-provider :locale="zhCN">
    <div style="height: 100%;">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
</script>
<style  lang="scss">
@import '/src/resource/css/global.scss'
</style>
