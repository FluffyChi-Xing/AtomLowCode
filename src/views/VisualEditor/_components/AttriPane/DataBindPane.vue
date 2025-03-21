<script setup lang="ts">
import { ref } from 'vue';
import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {watch} from "vue";
import DataPaneBreadCrumb from "@/views/VisualEditor/_components/AttriPane/_components/DataPaneBreadCrumb.vue";
import AttributePane from "@/views/VisualEditor/_components/AttriPane/_components/AttributePane.vue";
import EmptyPane from "@/views/VisualEditor/_components/AttriPane/_components/EmptyPane.vue";
import StyleAttributePane from "@/views/VisualEditor/_components/AttriPane/_components/StyleAttributePane.vue";
import EventAttriPane from "@/views/VisualEditor/_components/AttriPane/_components/EventAttriPane.vue";

const props = withDefaults(defineProps<{
  currentNode?: VisualEditorComponent;
  currentSec?: string;
  currentPage?: string;
  isReset?: boolean;
}>(), {
  currentPage: 'page1'
})

watch(() => props.currentNode, (val) => {
  console.log('currentNode:', val)
})

interface attributeTabTypes {
  index: number;
  label: string;
  value: string;
}

const highLightTab = ref<string>('attribute')
const emits = defineEmits(['deleteEvent'])
const currentPane = ref<any>(checkPane(highLightTab.value))
const paneBindData = ref<any>(props.currentNode)
const currentNode = ref<any>(props.currentNode)
const currentPage = ref<string>(props.currentPage);
const attriTabList = ref<attributeTabTypes[]>([
  {
    index: 1,
    label: '属性',
    value: 'attribute'
  },
  {
    index: 1,
    label: '样式',
    value: 'style'
  },
  {
    index: 3,
    label: '高级',
    value: 'advanced'
  },
  {
    index: 4,
    label: '事件',
    value: 'event'
  }
])

function initPaneData() {
  paneBindData.value = {
    label: props.currentNode?.label,
    props: props.currentNode?.props,
    events: props.currentNode?.events
  }
}

function checkPane(item: string) {
  switch (item) {
    case 'attribute':
      return AttributePane
    case 'style':
      return StyleAttributePane
    case 'event':
      return EventAttriPane
    default:
      return EmptyPane
  }
}

function handleTypeChange(index: string) {
  console.log('type:', index)
}

function deleteEvent(index: any) {
  emits('deleteEvent', index)
}

watch(() => highLightTab.value, (val) => {
  currentPane.value = checkPane(val)
})

watch(() => props.currentNode, () => {
  currentNode.value = props.currentNode;
  currentPage.value = props.currentPage;
  initPaneData()
})


watch(() => props.isReset, () => {
  currentNode.value = null
})
</script>

<template>
  <div class="w-full h-full flex flex-col bg-[#F2F3F5] items-center">
    <span v-if="!currentNode" class="text-gray-500 my-auto">请在左侧画布选中节点</span>
    <!-- bread crumb -->
    <div
        v-if="currentNode"
        class="w-full h-10 flex bg-white px-4 bread-crumb box-border"
    >
      <DataPaneBreadCrumb
          :current-page="currentPage"
          :current-component="currentNode?.key"
          :current-section="currentSec"
      />
    </div>
    <!-- attribute tabs -->
    <div
        v-if="currentNode"
        class="w-full h-10 flex items-center p-4 bg-white"
    >
      <el-tabs
          v-model="highLightTab"
          class="w-full"
      >
        <el-tab-pane
            v-for="item in attriTabList"
            :key="item.index"
            :label="item.label"
            :name="item.value"
        />
      </el-tabs>
    </div>
    <!-- attribute pane (form) -->
    <div
        v-if="currentNode"
        class="w-full flex"
        style="height: calc(100% - 80px)"
    >
      <el-scrollbar class="w-full h-full">
        <component
            :is="currentPane"
            :data="paneBindData"
            :label="props.currentSec"
            @update:type="handleTypeChange"
            @deleteEvent="deleteEvent"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.bread-crumb {
  border-bottom: 1px solid theme('colors.border');
}

:deep(.el-tabs__nav-wrap:after) {
  display: none;
}

:deep(.ell-scrollbar__view) {
  width: 100%;
  height: 100%;
}
</style>
