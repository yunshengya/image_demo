<template>
  <div>
    <div style="margin-bottom: 10px;display: flex;align-items: center;">
      <a-button style="margin-right: 10px;" type="primary"  @click="addUser">添加</a-button>
      <a-button @click="reFresh">刷新</a-button>
    </div>
    <TableStudent ref="tableStudent"></TableStudent>
    <addUserModal :flag="modalFlag.visible" @close="()=>{modalFlag.visible = false}" @reFresh="reFresh" />
  </div>
</template>

<script setup lang="ts">
//@ts-ignore
import TableStudent from './_component/TableStudent.vue'
//@ts-ignore
import addUserModal from './_component/addUserModal.vue'
import { reactive, ref } from 'vue'

const modalFlag = reactive({ visible: false })
const tableStudent = ref(null)

const addUser = () => {
	modalFlag.visible = true
}

// 刷新
const reFresh = () => {
	// 类型守卫确保 tableStudent.value 有 getList 方法
	if (tableStudent?.value && typeof tableStudent.value.getList === 'function') {
		tableStudent.value.getList()
	}
}
</script>

<style lang="less" scoped>
/* 您的样式 */
</style>