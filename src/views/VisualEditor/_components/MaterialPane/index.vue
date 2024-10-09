<script setup lang="ts">
import { ref } from 'vue';
import type {VisualEditorTypes} from "@/views/VisualEditor/_componsables/api/visualEditorTypes";
import Layout from "@/views/VisualEditor/_components/MaterialPane/_components/layout.vue";


const currentKey = ref<string>('base')
const baseMaterial = ref<VisualEditorTypes.baseMaterialTypes[]>([
  {
    label: '基础组件',
    index: 'base'
  },
  {
    label: '图表组件',
    index: 'chart'
  },
  {
    label: '业务组件',
    index: 'business'
  },
  {
    label: '布局组件',
    index: 'layout'
  },
  {
    label: '表单组件',
    index: 'form'
  },
  {
    label: '区块组件',
    index: 'block'
  }
])

function handleTabChange(tabs: string) {
  currentKey.value = tabs
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <!-- components tabs -->
    <el-scrollbar class="w-full h-full">
      <el-tabs
          v-model="currentKey"
          @tab-change="handleTabChange"
      >
        <el-tab-pane
            v-for="item in baseMaterial"
            :key="item.index"
            :name="item.index"
            :label="item.label"
        />
      </el-tabs>
      <!-- draggable area -->
      <div class="w-full h-full flex">
        <layout :component-name="currentKey" />
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>
:deep(.el-scrollbar__view) {
  width: 100%;
  height: 100%;
}
</style>
