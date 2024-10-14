<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";
import type {SectionTypes} from "@/views/VisualEditor/_componsables/api/sectionTypes";
import {$notify} from "@/componsabels/Element-Plus";
import type {
  VisualEditorComponent
} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";


defineOptions({
  name: 'SimulatorEditor',
});

const props = withDefaults(defineProps<{
  clearAll?: boolean;
}>(), {
  clearAll: false
})

const simulator = ref() // 获取模拟器容器

const sectionList = ref<SectionTypes.pageSection[]>([
  {
    index: 1,
    label: 'section1',
    isShow: false,
    component: []
  }
])
const drag = ref<boolean>(false)
const emits = defineEmits(['focusComp', 'currentSec', 'uploadSection'])


/**
 * 处理添加页面端函数
 */
function handleCreateSection() {
  // 向容器内添加一个新的sectionItem组件
  const base = sectionList.value.length
  sectionList.value.push({
    index: base + 1,
    label: `section${base + 1}`,
    isShow: false,
    component: []
  })
  syncSectionList()
}

/**
 * 处理聚焦事件
 * @param index
 */
function handleFocus(index: string) {
  // 清除所有sectionItem的聚焦状态
  sectionList.value.forEach((item: SectionTypes.pageSection) => {
    item.isShow = false
  })
  // 再根据index来判断是否聚焦当前的sectionItem
  sectionList.value.find((item: SectionTypes.pageSection) => {
    if (item.label === index) {
      item.isShow = !item.isShow
    }
  })
}

// TODO 删除 section 函数存在问题，待改进
function handleDelete(label: string) {
  if (sectionList.value.length > 1) {
    const index = sectionList.value.findIndex((item: SectionTypes.pageSection) => item.label === label);
    if (index !== -1) {
      sectionList.value.splice(index, 1);
      syncSectionList()
    }
  } else {
    $notify({
      type: "warning",
      title: "警告",
      message: "至少保留一个section",
      offset: 80
    })
  }
}

function handleFocusComp(comp: VisualEditorComponent) {
  emits('focusComp', comp)
}

function getSection(index: string) {
  emits('currentSec', index)
}

function createComponent(item: SectionTypes.createComp) {
  sectionList.value.find((some: SectionTypes.pageSection) => {
    if (item.sectionLabel === some.label) {
      some.component.push(item.comp)
      syncSectionList()
    }
  })
}

/**
 * 同步sectionList
 */
function syncSectionList() {
  // console.log('sectionList:', sectionList.value)
  emits('uploadSection', sectionList.value)
}


/**
 * 页面重置
 * @param index
 */
function handleClearAll(index: boolean) {
  sectionList.value = sectionList.value.splice(0, 1)
  // TODO 清除第一级 section 内的所有组件
  // sectionList.value[0].component = []
  console.log(`页面重置${index}`, sectionList.value)
}

watch(() => props.clearAll, (val) => {
  handleClearAll(val)
})
</script>

<template>
  <div
      ref="simulator"
      class="w-full h-full simulator flex"
  >
    <el-scrollbar ref="container" class="w-full h-full">
      <SectionItem
          v-for="(item, index) in sectionList"
          :key="index"
          :label="item.label"
          :list="sectionList[index]?.component"
          :drag="drag"
          :is-show="item.isShow"
          @create-section="handleCreateSection"
          @focus-section="handleFocus"
          @delete-section="handleDelete"
          @focus-comp="handleFocusComp"
          @currentSec="getSection"
          @create-comp="createComponent"
      />
    </el-scrollbar>
  </div>
</template>

<style scoped>
@import "style/simulator.scss";
:deep(.el-scrollbar__view) {
  width: 100%;
  height: 100%;
}
</style>
