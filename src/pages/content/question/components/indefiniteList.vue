<template>
  <div class="container" @scroll="scrollHandle" :style="{ width: width + 'px', height: height + 'px' }">
    <div class="content" :style="{ height: estimatedHeight(itemEstimatedSize, itemCount) + 'px' }">
      <template v-for="i in getCurrentChildren()">
        <div  :style="i.itemStyle" class="item">
          <slot :index="i.index" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 组件的 props
const props = defineProps({
  height: Number,
  width: Number,
  itemEstimatedSize: Number,
  itemSize: Number,
  itemCount:Number
});

// 状态管理
const scrollOffset = ref(0);

// 模拟测量数据
const measuredData = {
  measuredDataMap: {},
  LastMeasuredItemIndex: -1,
};

// 计算估算的总高度
const estimatedHeight = (defaultEstimatedItemSize = 50, itemCount) => {
  let measuredHeight = 0;
  const { measuredDataMap, LastMeasuredItemIndex } = measuredData;
  if (LastMeasuredItemIndex >= 0) {
    const lastMeasuredItem = measuredDataMap[LastMeasuredItemIndex];
    measuredHeight = lastMeasuredItem.offset + lastMeasuredItem.size;
  }
  const unMeasuredItemsCount = itemCount - measuredData.LastMeasuredItemIndex - 1;
  const totalEstimatedHeight = measuredHeight + unMeasuredItemsCount * defaultEstimatedItemSize;
  return totalEstimatedHeight;
};

// 获取项的元数据
const getItemMetaData = (index) => {
  const { itemSize } = props;
  const { measuredDataMap, LastMeasuredItemIndex } = measuredData;
  if (index > LastMeasuredItemIndex) {
    let offset = 0;
    if (LastMeasuredItemIndex >= 0) {
      const lastMeasuredItem = measuredDataMap[LastMeasuredItemIndex];
      offset += lastMeasuredItem.offset + lastMeasuredItem.size;
    }
    for (let i = LastMeasuredItemIndex + 1; i <= index; i++) {
      const currentItemSize = itemSize(i);
      measuredDataMap[i] = { size: currentItemSize, offset };
      offset += currentItemSize;
    }
    measuredData.LastMeasuredItemIndex = index;
  }
  return measuredDataMap[index];
};

// 获取开始索引
const getStartIndex = (scrollOffset) => {
  let index = 0;
  while (true) {
    const currentOffset = getItemMetaData(index).offset;
    if (currentOffset >= scrollOffset) return index;
    index++;
  }
};

// 获取结束索引
const getEndIndex = (startIndex) => {
  const { height } = props;
  const startItem = getItemMetaData(startIndex);
  const maxOffset = startItem.offset + height;
  let offset = startItem.offset + startItem.size;
  let endIndex = startIndex;
  while (offset <= maxOffset) {
    endIndex++;
    const currentItem = getItemMetaData(endIndex);
    offset += currentItem.size;
  }
  return endIndex;
};

// 获取需要渲染的范围
const getRangeToRender = (scrollOffset) => {
  const { itemCount } = props;
  const startIndex = getStartIndex(scrollOffset);
  const endIndex = getEndIndex(startIndex);
  return [
    Math.max(0, startIndex - 2),
    Math.min(itemCount - 1, endIndex + 2),
    startIndex,
    endIndex,
  ];
};

// 获取当前需要渲染的子项
const getCurrentChildren = () => {
  const [startIndex, endIndex] = getRangeToRender(scrollOffset.value);
  const items = [];
  for (let i = startIndex; i < endIndex; i++) {
    const item = getItemMetaData(i);
    const itemStyle = {
      position: 'absolute',
      height: item.size + 'px',
      width: '100%',
      top: item.offset + 'px',
    };
    items.push({ itemStyle, index: i });
  }
  return items;
};

// 滚动事件处理函数
const scrollHandle = (event) => {
  const { scrollTop } = event.target;
  scrollOffset.value = scrollTop;
};
</script>

<style scoped>
.container {
	position: relative;
	overflow: auto;
	will-change: transform;
}

.content {
	position: relative;
	width: 100%;
}

.item {
	display: flex;
	align-items: center;
	background-color: #f3f3f3;
	border-bottom: 1px solid #ddd; /* 可选: 添加边框以区分项 */
}
</style>
