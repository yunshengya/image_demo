<template>
  <div>
    <a-table :columns="columns" :pagination="pageObj" :data-source="tableData.tableList" :loading="tableData.loading" :scroll="{ x: 400,y: 420}"    >
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { AxiosList } from '@/application/server/apiStudent'
import { onMounted, reactive } from 'vue'

// 挂载后执行
onMounted(() => {
	getList(pageObj)
})
const columns = [
	{
		title: '姓名',
		dataIndex: 'sname',
		key: 'sname',
	},
	{
		title: '学号',
		dataIndex: 'sno',
		key: 'sno',
	},
]
const pageObj = reactive({
	current: 1,
	pageSize: 10,
	total: 0,
	onChange: (page: number, pageSize: number) => {
		pageObj.current = page
		pageObj.pageSize = pageSize
		getList()
	},
})
const tableData = reactive({
	loading: false,
	tableList: [],
})

const getList = (data: any = pageObj) => {
	tableData.loading = true
	AxiosList({ page: data.current, pageSize: data.pageSize })
		.then(res => {
			const { data } = res
			tableData.tableList = data.data
			pageObj.current = data.current
			pageObj.pageSize = data.pageSize
      pageObj.total = data.total
		})
		.finally(() => {
			tableData.loading = false
		})
}

defineExpose({
	getList,
})
</script>