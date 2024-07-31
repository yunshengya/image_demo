<template>
  <div class="box" style="height: max-content;width:100%;padding:24px;">

  <!-- <div class="stopButton">
    <img src="../../../public/image/stopButton.png" alt="">
  </div> -->

  <div class="scene-container">
    <div v-if="loading">加载中...</div>
    <div v-else>
      <div class="html_text" v-html="content"></div>
    </div>
  </div>
</div>

</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

// 用于存储从接口获取的数据
const content = ref('');
const loading = ref(true);

onMounted(async () => {
  try {
    // https://vip.chinawriter.com.cn/member/1983zh/viewarchives_648504.html
    const url = 'https://vip.chinawriter.com.cn/member/1983zh/viewarchives_648504.html';
    const response = await axios.post('http://localhost:3001/fetch-content', { url });
    content.value = response.data.content;
  } catch (error) {
    console.error('Error fetching content:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
.html_text {
	p {
		margin: 10px;
		color: red;
	}
}
// .stopButton {
// 	border-radius: 50%;
// 	width: 60px;
// 	height: 60px;
// 	cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// 	// background: radial-gradient(circle, transparent 0%, rgba(255, 255, 255, 0) 40%,rgb(255, 255, 255) 40%, rgba(224, 224, 224, 0.5) 60%,transparent 70%);
//   background: radial-gradient(circle, transparent 0%, transparent 20%, rgba(233, 216, 216, 0.5) 60%,transparent 70%);
//   img{
//     width: 40px;
//     height: 40px;
//     opacity: 1;
//   }
// 	// animation: fade 0.8s infinite;
// }
// @keyframes fade {
// 	0%,
// 	100% {
//     // opacity: 1;
//     // background: radial-gradient(circle, transparent 0%, transparent 20%, rgba(224, 224, 224, 0) 60%,transparent 70%);
//  translate: scale(0.8);
// 	}
// 	50% {
//     translate: scale(1);

//     // opacity: 0.8;
//     // background: radial-gradient(circle, transparent 0%, transparent 20%, rgba(233, 216, 216, 0.5) 60%,transparent 70%);
// 	}
// }

.stopButton {
  margin:100px 100px;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	transition: background-size 0.4s; /* 平滑过渡背景大小变化 */
  img{
    width: 40px;
    height: 40px;
  }
}

.stopButton::before {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 120%; /* 初始大小设置为按钮的200% */
	height: 120%;
	background: radial-gradient(circle, transparent 45%, rgb(255, 255, 255,0.8) 40%, rgba(255, 255, 255, 0.5) 42%);
	border-radius: 50%;
	animation: rippleAnimation 2s infinite;
}

@keyframes rippleAnimation {
	0% {
		transform: translate(-50%, -50%) scale(1.1); /* 从较小的尺寸开始 */
  	background: radial-gradient(circle, transparent 45%, rgb(255, 255, 255,0.8) 45%, rgba(255, 255, 255, 0.5) 40%);
	}
	50% {
		transform: translate(-50%, -50%) scale(0.8); /* 扩散到最大尺寸 */
  	background: radial-gradient(circle, transparent 47%,  rgba(255, 255, 255, 0.5) 50%,  rgba(255, 255, 255, 0.6) 60%);
	}
	100% {
		transform: translate(-50%, -50%) scale(1.1); /* 回到较小的尺寸 */
  	background: radial-gradient(circle, transparent 45%, rgb(255, 255, 255,0.8) 45%, rgba(255, 255, 255, 0.5) 40%);
	}
}
</style>
