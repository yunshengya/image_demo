<template>
  <div class="box" @scroll="scrollHandle" :style="{ height: height + 'px' }">
    <ul :style="{ height: itemCount * itemHeight + 'px' }" class="list">
      <li v-for="(item) in getCurrentChildren()" :key="item.index" :style="item.itemStyle">
        <slot :index="item.index">{{ item.index }}</slot>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 通过 defineProps 获取传递给组件的属性
const props = defineProps({
  itemHeight: {
    type: Number,
    default: 40
  },
  height: {
    type: Number,
    default: 400
  },
  itemCount: {
    type: Number,
    default: 1000
  }
});

const scrollOffset = ref(0);

const getCurrentChildren = () => {
  // 获取当前可视区域的第一个元素
  const startIndex = Math.floor(scrollOffset.value / props.itemHeight);
  // 上缓冲区起始索引
  const start = Math.max(0, startIndex - 5);
  // 可视区能展示的元素的最大个数
  const num = Math.ceil(props.height / props.itemHeight);
  // 下缓冲区结束索引
  const end = Math.min(props.itemCount, startIndex + num + 5);
  const items = [];
  for (let i = start; i < end; i++) {
    const itemStyle = {
      position: 'absolute',
      top: `${i * props.itemHeight}px`,
      height: `${props.itemHeight}px`,
      backgroundColor: i % 2 === 0 ? '#d7d7d7' : '#f3f3f3',
    };
    items.push({ itemStyle, index: i });
  }
  return items;
};

// 滚动事件
const scrollHandle = (event) => {
  const { scrollTop } = event.currentTarget;
  scrollOffset.value = scrollTop;
};
</script>

<style lang="scss" scoped>
* {
	margin: 0;
	padding: 0;
}
.box {
	width: 500px;
	overflow: auto;
}
ul {
	position: relative;
	clear: both;
	padding: 0;
	margin: 0;
}
li {
	width: 100%;
	display: flex;
	align-items: center;
	background-color: #f3f3f3;
	border-bottom: 1px solid #ddd; /* 可选: 添加边框以区分项 */
}
</style>