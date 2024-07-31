<template>
  <div class="father">
    <div class="list-view" ref="scrollBox" @scroll="handleScroll">
      <div class="list-view-shadow" :style="{
          height: contentHeight,
        }"></div>
      <div ref="content" class="list-view-content">
        <div class="list-view-item" :style="{
            height: item.height + 'px',
          }" v-for="item in state.visibleData" :key="item.val">
          {{ item.val }}--height--{{ item.height }}
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup>
import { onMounted, computed, ref, reactive, watch } from "vue";
let scrollBox = ref(null).value; //获取dom元素
let content = ref(null).value;
let contentHeight = computed({
  get () {
    return computedData[computedData.length - 1].bom + "px";
  },
});

onMounted(() => {
  updateVisibleData(); //首次渲染数据
});

let data = []; //存储随机高度，想要固定高度列表的童鞋把随机函数去掉即可
let minHeight = 35; //设置最小高度
for (let i = 0; i < 10000; i++) {
  //这里val相当于列表id啦
  data.push({ val: i, height: minHeight + Math.random() * 40 });
}

let computedData = []; //辅助数组存储累加高度，用来修正高度
for (let i = 0; i < data.length; i++) {
  let bom = data[i].height + (i === 0 ? 0 : computedData[i - 1].bom);
  computedData[i] = { val: data[i].val, bom };
}

//visibleData用来存储展示的数据
//start用来记录该渲染的数据的首个索引
let state = reactive({
  visibleData: [],
  start: 0,
});

//用watch来监听start是否发生变化，如果发生变化才调用处理函数，这个可以提升性能
watch(
  () => state.start,
  (newval, oldval) => {
    if (newval !== oldval) {
      updateVisibleData();
    }
  }
);

function updateVisibleData () {
  //计算最大容量(渲染呈现的区域 / 最小高度)
  const visibleCount = Math.ceil(scrollBox.clientHeight / minHeight);
  const end = state.start + visibleCount;
  state.visibleData = data.slice(state.start, end);
  //计算滚动距离(累计到当前索引高度 - 当前索引所占高度，这就实现了视图包含当前索引的那项div)
  let scrollLen = computedData[state.start].bom - data[state.start].height;
  //设置偏移距离(因为鼠标一直在滚动，不设置的话这个呈现列表就在原地不动啦)
  content.style.webkitTransform = `translate3d(0, ${scrollLen}px, 0)`;
}

function handleScroll () {
  const scrollTop = scrollBox.scrollTop; //获取滚动距离
  state.start = findStart(scrollTop);
}

function findStart (scrollTop) {
  let left = 0;
  let right = computedData.length;
  //二分法寻找start
  while (left + 1 != right && right > 0) {
    let mid = Math.floor((left + right) / 2);
    if (computedData[mid].bom > scrollTop) {
      right = mid;
    } else {
      left = mid;
    }
  }
  //为什么要返回right，因为我们1判断的是bom属性，按照上面的算法来说，right下标下面的bom属性永远大于滚动距离----
  //left下标对于的bom永远小于等于滚动距离，也就是说left索引对应的元素可以不用渲染;如果滚动距离没超过某个索引下的bom属性时，当前索引有效（也就是right）。
  return left === 0 ? 0 : right;
}
</script>
<style scoped lang="scss">
.father {
	width: 500px;
}
.list-view {
	height: 400px;
	overflow: auto;
	position: relative;
	border: 1px solid #aaa;
}

.list-view-shadow {
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	z-index: -1;
	visibility: hidden;
}

.list-view-content {
	left: 0;
	right: 0;
	top: 0;
	position: absolute;
}
.list-view-content div:nth-child(2n + 1) {
	background-color: rgb(222, 85, 108);
}
.list-view-item {
	display: flex;
	align-items: center;
	justify-content: center;
	color: #666;
	box-sizing: border-box;
	background-color: rgb(61, 217, 234);
	border: 1px solid snow;
}
</style>