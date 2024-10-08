<script setup lang="ts">
import { ref } from 'vue';
import type {VisualEditorTypes} from "@/views/VisualEditor/_componsables/api/visualEditorTypes";
import {Coin, Menu, More, Operation} from "@element-plus/icons-vue";



const emits = defineEmits(['expand'])
const sideBarBtns = ref<VisualEditorTypes.canvasSizeTypes[]>([
  {
    icon: Operation,
    label: '大纲树',
    value: 'tree'
  },
  {
    icon: Menu,
    label: '物料库',
    value: 'material'
  },
  {
    icon: Coin,
    label: '数据源',
    value: 'dataSource'
  },
  {
    icon: More,
    label: 'Schema',
    value: 'schema'
  }
])

function handleClick(index: string) {
  emits('expand', index)
}
</script>

<template>
  <div class="w-full h-full flex py-5 side-pane box-border flex-col z-[3999] justify-between bg-white">
    <!-- top function button group -->
    <div class="w-full h-auto flex items-center flex-col">

      <el-tooltip
          v-for="(item, index) in sideBarBtns"
          :key="index"
          :content="item.label"
          effect="dark"
          placement="right"
      >
        <el-button
            type="text"
            class="w-9 h-9 flex"
            @click="handleClick(item.value)"
        >
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<style scoped>
:deep(.el-button) {
  margin: 0;
}

.side-pane {
  border-right: 1px solid theme('colors.border');
}
</style>
