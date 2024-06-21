<template>
  <div class="box">
    <div class="box_video" @mousemove="showControls" @mouseleave="hideControls">
      <video ref="videoElement" :src="videoSrc" @click="togglePlay" controls @timeupdate="updateProgress" @ended="nextVideo"></video>
      <div class="controls" v-show="controlsVisible">
        <button @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</button>
        <button @click="setSpeed(1)">1x</button>
        <button @click="setSpeed(1.5)">1.5x</button>
        <button @click="setSpeed(2)">2x</button>
      </div>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const videoElement = ref<HTMLVideoElement | null>(null)
const videoSrc = ref('https://api.bokexia.com/api/mn')
const isPlaying = ref(false)
const progress = ref(0)
const controlsVisible = ref(false)

const updateProgress = () => {
	if (videoElement.value) {
		progress.value = (videoElement.value.currentTime / videoElement.value.duration) * 100
	}
}

const togglePlay = () => {
	if (videoElement.value) {
		if (videoElement.value.paused) {
			videoElement.value.play()
			isPlaying.value = true
		} else {
			videoElement.value.pause()
			isPlaying.value = false
		}
	}
}

const setSpeed = (speed: number) => {
	if (videoElement.value) {
		videoElement.value.playbackRate = speed
	}
}

const nextVideo = () => {
	// Here you would implement logic to fetch the next video URL
	// For now, we'll just reload the same video for demonstration
	videoElement.value?.load()
	videoElement.value?.play()
	isPlaying.value = true
}

const previousVideo = () => {
	// Here you would implement logic to fetch the previous video URL
	// For now, we'll just reload the same video for demonstration
	videoElement.value?.load()
	videoElement.value?.play()
	isPlaying.value = true
}

const skipTime = (seconds: number) => {
	if (videoElement.value) {
		videoElement.value.currentTime += seconds
	}
}

const handleKeyDown = (event: KeyboardEvent) => {
	switch (event.key) {
		case 'ArrowRight':
			skipTime(10) // 快进10秒
			break
		case 'ArrowLeft':
			skipTime(-10) // 快退10秒
			break
		case 'ArrowUp':
			nextVideo() // 切换到下一个视频
			break
		case 'ArrowDown':
			previousVideo() // 切换到上一个视频
			break
		default:
			break
	}
}

const showControls = () => {
	controlsVisible.value = true
}

const hideControls = () => {
	controlsVisible.value = false
}

onMounted(() => {
	window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
	window.removeEventListener('keydown', handleKeyDown)
})
</script>
<style lang="scss" scoped>
html,
body {
	margin: 0;
	padding: 0;
	height: 100%;
	overflow: hidden;
}

.box {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-color: #000;
}

.box_video {
	position: relative;
	width: 100%;
	height: 100%;
	max-width: 600px;
	max-height: 800px;
	background-color: #000;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	overflow: hidden;

	video {
		width: 100%;
		height: 100%;
		object-fit: contain;
		border-radius: 10px;
	}

	.controls {
		position: absolute;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		gap: 10px;
		z-index: 10;
		opacity: 0;
		transition: opacity 0.3s;

		button {
			background-color: rgba(255, 255, 255, 0.7);
			border: none;
			padding: 5px;
			cursor: pointer;
			border-radius: 50%;
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			color: #000;
			&:hover {
				background-color: rgba(255, 255, 255, 0.9);
			}
		}
	}

	&:hover .controls {
		opacity: 1;
	}

	.progress-container {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 5px;
		background-color: rgba(255, 255, 255, 0.2);
	}

	.progress-bar {
		height: 100%;
		background-color: #ff0000;
		width: 0;
	}
}

@media (max-width: 768px) {
	.box_video {
		max-width: 100%;
		max-height: 100%;
		border-radius: 0;
	}

	.controls {
		bottom: 10px;

		button {
			padding: 5px 10px;
		}
	}

	.progress-container {
		height: 3px;
	}
}
</style>