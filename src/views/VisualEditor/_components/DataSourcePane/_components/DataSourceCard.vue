<script setup lang="ts">
import { ref } from 'vue'
import {Delete, Edit, Hide, View} from "@element-plus/icons-vue";
import {DataSourceTypes} from "@/views/VisualEditor/_components/DataSourcePane/_componsables/apis/DataSourceTypes";



const props = withDefaults(defineProps<{
  dataName?: string;
  dataTypes?: string;
  dataId?: number;
}>(), {

})

/** ===== 数据源卡片处理-start ===== **/
const viewBtn = ref<any>(View)
const isView = ref<boolean>(false)
const editBtn = ref<any>(Edit)
const isEdit = ref<boolean>(false)
const emits = defineEmits(['view', 'edit', 'delete'])

function handleView() {
  isView.value = !isView.value
  if (isView.value) {
    viewBtn.value = Hide
    viewEmit({
      id: props.dataId,
      expand: isView.value
    })
  } else {
    viewBtn.value = View
    viewEmit({
      id: props.dataId,
      expand: isView.value
    })
  }
}

function viewEmit(index: DataSourceTypes.cardSendMes) {
  emits('view', index)
}

function handleEdit() {
  isEdit.value = !isEdit.value
  emits('edit', {
    id: props.dataId,
    expand: isEdit.value
  })
}

function handleDelete() {
  if (!isEdit.value && !isView.value) {
    emits('delete', props.dataId)
  }
}
/** ===== 数据源卡片处理-end ===== **/
</script>

<template>
  <div class="w-full h-20 p-2 flex rounded-[4px] mt-4 box-border data-card overflow-hidden">
    <!-- left info area -->
    <div class="w-1/2 h-full flex flex-col">
      <!-- data source name -->
      <span class="w-full h-auto flex items-center text-gray-500 font-bold text-[13px] text-ellipsis whitespace-nowrap overflow-hidden">
        {{ dataName }}
      </span>
      <!-- data source type tag -->
      <div class="w-full h-auto flex items-center mt-auto">
        <el-tag type="info">{{ dataTypes }}</el-tag>
      </div>
    </div>
    <!-- right control area -->
    <div class="w-1/2 h-full flex flex-col">
      <div class="w-full h-auto flex justify-end items-center">
        <!-- more -->
        <el-tooltip
            effect="dark"
            content="查看"
            placement="bottom"
        >
          <el-button @click="handleView" type="text">
            <el-icon>
              <component :is="viewBtn" />
            </el-icon>
          </el-button>
        </el-tooltip>
        <!-- setting -->
        <el-tooltip
            effect="dark"
            content="编辑"
            placement="bottom"
        >
          <el-button @click="handleEdit" type="text">
            <el-icon>
              <component :is="editBtn" />
            </el-icon>
          </el-button>
        </el-tooltip>
        <!-- delete -->
        <el-tooltip
            effect="dark"
            content="删除"
            placement="bottom"
        >
          <el-button @click="handleDelete" type="text">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-card {
  border: 1px solid theme('colors.border');
}
</style>
