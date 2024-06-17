<template>
  <div>
    <a-modal v-model:visible="props.flag" title="添加用户" @ok="handleOk" @cancel="handleCancel">
      <a-form :model="form" :rules="rules" ref="formRef">
        <a-form-item label="学号" name="sno">
          <a-input v-model:value="form.sno" />
        </a-form-item>
        <a-form-item label="姓名" name="sname">
          <a-input v-model:value="form.sname" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { AxiosInsertStudent } from '@/application/server/apiStudent'
import { message } from 'ant-design-vue'
import { reactive, ref } from 'vue'

const formRef = ref(null)
const handleOk = () => {
	//@ts-ignore
	formRef.value?.validate()
		.then(() => {
			// Form validation passed
			insert(form)
		})
		.catch((error: any) => {
			// Form validation failed
			console.log('表单验证失败', error)
		})
}

const form = reactive({
	sno: '',
	sname: '',
})

const rules = {
	sno: [
		{
			required: true,
			message: '请输入学号',
			trigger: 'blur',
		},
	],
	sname: [
		{
			required: true,
			message: '请输入姓名',
			trigger: 'blur',
		},
	],
}

const props = defineProps({
	flag: Boolean,
})

// 定义接口描述data的结构
interface DataParams {
	sno: string
	sname: string
}
const emit = defineEmits(['close', 'reFresh'])
const handleCancel = () => {
	emit('close')
}

const insert = (data: DataParams) => {
	if (!data.sno) return message.error('学号不能为空')
	AxiosInsertStudent(data)
		.then(res => {
			// 可以在这里添加更多的成功处理逻辑
			handleCancel()
			emit('reFresh')
		})
		.catch(error => {
			message.error(error.response.data.message)
			// 处理请求错误
		})
}
</script>
<style lang="scss" scoped>
</style>