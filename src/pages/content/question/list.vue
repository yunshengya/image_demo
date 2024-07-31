<template>
  <div>
    <!-- <ListFix :itemCount="itemCount" :itemHeight="itemHeight" :height="height">
      <template #default="{ index }">
        <div class="listfix">{{ index }}</div>
      </template>
    </ListFix>
    <indefiniteList></indefiniteList> -->
  </div>
</template>
<script setup>
import indefiniteList from './components/list.vue';
import ListFix from './components/ListFix.vue';
const itemHeight = 40;
const height = 400;
const itemCount = 1000;
</script>
<style scoped lang="scss">
.listfix {
	width: 100%;
	text-align: center;
}
</style>