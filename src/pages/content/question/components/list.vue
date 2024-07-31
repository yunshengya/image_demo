<template>
  <VariableSizeList
    class="list"
    :height="600"
    :width="200"
    :itemSize="getItemSize"
    :itemCount="1000"
  >
    <template #default="{ index, style }">
      <div :style="style" :class="index % 2 ? 'list-item-odd' : 'list-item-even'">
        Row {{ index }}
      </div>
    </template>
  </VariableSizeList>
</template>

<script setup>
import VariableSizeList from './indefiniteList.vue';

// 模拟行高数据
const rowSizes = new Array(1000).fill(true).map(() => 25 + Math.round(Math.random() * 55));

// 获取行高
const getItemSize = (index) => rowSizes[index];
</script>

<style scoped>
.list-item-odd {
  background-color: #d7d7d7;
}

.list-item-even {
  background-color: #f3f3f3;
}
</style>
