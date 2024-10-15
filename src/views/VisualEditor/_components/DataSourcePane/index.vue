<script setup lang="ts">
import {ref, watch} from 'vue'
import {DataSourceTypes} from "@/views/VisualEditor/_components/DataSourcePane/_componsables/apis/DataSourceTypes";
import DataSourceCard from "@/views/VisualEditor/_components/DataSourcePane/_components/DataSourceCard.vue";

const props = withDefaults(defineProps<{
  newCard?: any;
}>(), {

})


interface dataSourceTypes {
  label: string;
  value: string;
}

/** ===== 新建数据源选择-start ===== **/
const sourceTypes = ref<string>()
const defaultOptions = ref<dataSourceTypes[]>([
  {
    label: 'fetch',
    value: 'fetch'
  },
  {
    label: 'jsonb',
    value: 'jsonb'
  }
])
/** ===== 新建数据源选择-end ===== **/

/** ===== 数据源初始化-start ===== **/
const dataSourceList = ref<DataSourceTypes.dataCardTypes[]>([
  {
    name: '数据源A',
    type: 'fetch',
    id: 1
  }
])
const emits = defineEmits(['syncView', 'syncEdit', 'syncDelete', 'createCards'])

function handleView(index: DataSourceTypes.cardSendMes) {
  emits('syncView', {
    expand: index.expand,
    value: dataSourceList.value?.find((item: DataSourceTypes.dataCardTypes) => {
      if (item.id === index.id) {
        return item
      }
    })
  })
}

function handleEdit(index: DataSourceTypes.cardSendMes) {
  emits('syncEdit', {
    expand: index.expand,
    value: dataSourceList.value?.find((item: DataSourceTypes.dataCardTypes) => {
      if (item.id === index.id) {
        return item
      }
    })
  })
}

function handleDelete(index: number) {
  emits('syncDelete', {
    id: index,
    name: dataSourceList.value?.find((item: DataSourceTypes.dataCardTypes) => {
      if (item.id === index) {
        return item.name
      }
    })?.name
  })
}

function handleClear() {
  sourceTypes.value = ''
}

function createCards(index: string) {
  if (index) {
    emits('createCards', index)
  }
}
/** ===== 数据源初始化-end ===== **/

/** ===== 新建数据源-start ===== **/
function handleCreate() {
  dataSourceList.value?.push({
    name: props.newCard?.name,
    type: props.newCard?.type,
    id: dataSourceList.value.length + 1
  })
}

watch(() => props.newCard, () => {
  handleCreate()
})
/** ===== 新建数据源-end ===== **/
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <!-- selection -->
    <div class="w-full h-10 flex items-center box-border data-source">
      <el-select
          v-model="sourceTypes"
          placeholder="新建数据源"
          style="width: 150px"
          class="mr-2"
          clearable
          @clear="handleClear"
          @change="createCards"
      >
        <el-option
            v-for="(item, index) in defaultOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-button-group>
        <el-button type="text" size="small">导入</el-button>
        <el-button type="text" size="small">导出</el-button>
      </el-button-group>
    </div>
    <!-- data source card -->
    <div
        style="height: calc(100% - 56px)"
        class="w-full flex flex-col items-center mt-4"
    >
      <el-scrollbar class="w-full h-full">
        <div
            v-if="defaultOptions?.length"
            class="w-full h-auto flex flex-col"
        >
          <DataSourceCard
              v-for="(item, index) in dataSourceList"
              :key="index"
              :data-id="item.id"
              :data-name="item.name"
              :data-types="item.type"
              @view="handleView"
              @edit="handleEdit"
              @delete="handleDelete"
          />
        </div>
        <div
            v-else
            class="w-full h-auto flex"
        >
          <el-empty
              description="暂无数据"
          />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.data-source {
  border-bottom: 1px solid theme('colors.border');
}
</style>
