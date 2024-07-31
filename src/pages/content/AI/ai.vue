<template>
  <div class="box">
    <div class="content">
      <div class="chat" ref="chatContainer">
        <div class="chat-item" v-for="(item,index) in historyList" :key="index">
          <a-avatar :size="36" :src="store.avatar" alt="USER"></a-avatar>
          <div class="chat-item_box">
            <span class="chat-item_time">{{ formatDate(item.time) }}</span>
            <span class="chat-item_content">{{ item.content }}</span>
          </div>
        </div>
      </div>
      <div class="send">
        <div class="send_options">
        </div>
        <div class="send_content">
          <a-textarea v-model:value="contentInput" placeholder="请输入内容" :autosize="{minRows: 3,maxRows: 3}" />
          <a-button class="send_content_button" :disabled="!contentInput" type="primary" @click="send(contentInput)">
            <template #icon>
              <SendOutlined />
            </template>
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import GoEasyUtil from '@/modules/goEasy/goEasy'
import { ref, watch, onMounted } from 'vue';
import { formatDate } from './utils'
import { SendOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/store' // 确保路径正确
const store = useUserStore()

const goeasy = GoEasyUtil.getInstanceEx();
let pubsub = goeasy.pubsub;
const nowDate = new Date().toLocaleString();
let contentInput = ref('');
const chatContainer = ref(null);
let historyList = ref([]);
const scrollToBottom = () => {
  setTimeout(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  }, 100);
};
const content = async () => {
  //建立连接
  await goeasy.connect({
    onSuccess: function () {  //连接成功
      console.log("GoEasy connect successfully.") //连接成功
    },
    onFailed: function (error) { //连接失败
      console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
    },
    onProgress: function (attempts) { //连接或自动重连中
      console.log("GoEasy is connecting", attempts);
    }
  });
}
const receive = async () => {
  await pubsub.subscribe({
    channel: "my_channel",//替换为您自己的channel
    onMessage: function (message) {
      //收到消息
      console.log("Channel:" + message.channel + " content:" + message.content);
      historyList.value.push({
        time: new Date(),
        content: message.content
      })
      scrollToBottom();
    },
    onSuccess: function () {
      console.log("Channel订阅成功。");
    },
    onFailed: function (error) {
      console.log("Channel订阅失败, 错误编码：" + error.code + " 错误信息：" + error.content)
    }
  });
}

const send = async (message) => {
  message = 'userId001#' + message;
  await pubsub.publish({
    channel: "my_channel",//替换为您自己的channel
    message: message,//替换为您想要发送的消息内容
    onSuccess: async function () {
      contentInput.value = '';
      console.log("消息发布成功。");
    },
    onFailed: function (error) {
      console.log("消息发送失败，错误编码：" + error.code + " 错误信息：" + error.content);
    }
  });
}

const history = async () => {
  await goeasy.pubsub.history({
    channel: 'my_channel', //必需项
    // start: 1561347527648, //可选项，开始时间，默认为0，即从第一条消息开始查
    // end: 1561347706447, //可选项，结束时间,默认为当前时间
    limit: 30, //可选项，返回的消息条数，默认为10条，最多30条
    onSuccess: function (response) {
      console.log("收到历史消息: " + JSON.stringify(response));
      if (response.code === 200 && response.content?.messages.length > 0) {
        historyList.value = response?.content?.messages || [];
        scrollToBottom();
      }
    },
    onFailed: function (error) { //获取失败
      console.log("Failed to obtain history, code:" + error.code + ",error:" + error.content);
    }
  });
}
// 获取当前年月日时分秒
// console.log(nowDate);
// console.log(new Date().getTime());
// content();
// receive();
// history();




</script>
<style scoped lang="scss">
@import 'style.scss';
</style>