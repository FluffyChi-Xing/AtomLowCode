<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
const props = withDefaults(defineProps<{
  data?: any;
}>(), {

})


const emits = defineEmits(['editEvent', 'deleteEvent'])
const currentEvent = ref<string>('all')
const componentEvent = ref<any[]>([
  {
    label: '全部',
    value: 'all'
  }
])
const eventList = ref<any[]>(props.data?.events ? props.data?.events : [
  {
    label: '样例',
    value: 'example'
  }
])
function clearEvent() {
  currentEvent.value = 'all'
}

function handleDelete(item: string, index: string) {
  emits('deleteEvent', {
    label: item,
    event: index
  })
}

function initData() {
  // 恢复原有数据(除了第一个)
  componentEvent.value.splice(1)
  props.data?.events?.forEach((item: any) => {
    componentEvent.value?.push({
      label: item.label,
      value: item.value
    })
  })
  eventList.value = props.data?.events;
}

onMounted(() => {
  initData()
})

watch(() => props.data, () => {
  initData()
})
</script>

<template>
  <div class="w-full h-auto flex flex-col px-4">
    <!-- 操作 -->
    <div class="w-full h-auto grid grid-cols-2 gap-4 mt-4">
      <!-- 组件已有事件 -->
      <el-select
          v-model="currentEvent"
          placeholder="请选择组件事件"
          clearable
          @clear="clearEvent"
          placement="bottom"
      >
        <el-option
            v-for="(item, index) in componentEvent"
            :key="index"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <!-- 组件事件新建 -->
      <el-button type="primary">新建组件事件</el-button>
    </div>
    <!-- 事件表格 -->
    <div class="w-full h-auto flex flex-col mt-4">
      <el-table
          :data="eventList"
          stripe
          highlight-current-row
          fit
          border
          :header-cell-style="{background: '#EBECF0', color: '#000000', textAlign: 'center'}"
      >
        <el-table-column
            label="已有事件"
            prop="label"
        />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button-group>
              <el-button icon="Setting" type="text" size="small" />
              <el-button @click="handleDelete(props.data?.label, row?.label)" icon="Delete" type="text" size="small" class="text-red-500" />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>

</style>
