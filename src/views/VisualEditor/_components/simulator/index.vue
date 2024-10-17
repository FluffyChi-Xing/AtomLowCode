<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import initJson from '@/init.json'
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";
import type {SectionTypes} from "@/views/VisualEditor/_componsables/api/sectionTypes";
import {$message, $notify} from "@/componsabels/Element-Plus";
import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {
  deleteSection,
  insertComponent,
  insertSection, localKey,
  persistentSectionList
} from "@/views/VisualEditor/_componsables/hooks/useVisualData";


defineOptions({
  name: 'SimulatorEditor',
});

const props = withDefaults(defineProps<{
  clearAll?: boolean;
}>(), {
  clearAll: false
})

const simulator = ref() // 获取模拟器容器

const sectionList = ref<SectionTypes.pageSection[]>()
const drag = ref<boolean>(false)
const emits = defineEmits(['focusComp', 'currentSec', 'uploadSection'])


/**
 * 处理添加页面端函数
 */
function handleCreateSection() {
  // 向容器内添加一个新的sectionItem组件
  const base = sectionList.value.length
  const section = {
    index: base + 1,
    label: `section${base + 1}`,
    isShow: false,
    component: []
  }
  sectionList.value.push(section)
  syncSectionList()
  // 尝试将创建的 section 插入initJson中
  insertSection(section);
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
      // 同步到 sessionStorage
      deleteSection(label)
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

function handleFocusComp(item: SectionTypes.createComp) {
  // 去除无关 section 中的 component 的 focus 状态
  console.log('section component 高亮处理:', sectionList.value)
  sectionList.value?.forEach((section: SectionTypes.pageSection) => {
    if (section.label !== item.sectionLabel) {
      section?.component?.forEach((comp: VisualEditorComponent) => {
        comp.focus = false
        console.log('非当前 section 中的组件清除 focus 状态')
      })
    }
  })
  emits('focusComp', item.comp)
}

function getSection(index: string) {
  emits('currentSec', index)
}

function createComponent(item: SectionTypes.createComp) {
  sectionList.value.find((some: SectionTypes.pageSection) => {
    if (item.sectionLabel === some.label) {
      some.component.push(item.comp)
      syncSectionList()
      // 同步写入 session storage 中
      insertComponent(item);
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
 */
function handleClearAll() {
  sectionList.value.splice(0, sectionList.value.length - 1)
  sectionList.value[0].component = []
  // 同步处理 session storage 中的数据为 initJson
  sessionStorage.setItem(localKey, JSON.stringify(initJson))
  $message({
    type: 'success',
    message: '页面重置成功',
    offset: 80
  })
}

watch(() => props.clearAll, () => {
  handleClearAll()
})

/** ===== 页面刷新重新渲染-start ===== **/
function pageInit() {
  const sectionData = persistentSectionList()
  if (sectionData) {
    sectionList.value = sectionData
  } else {
    sectionList.value = [
      {
        index: 1,
        label: 'section1',
        isShow: false,
        component: []
      }
    ]
  }
}

onMounted(() => {
  pageInit();
})
/** ===== 页面刷新重新渲染-end ===== **/
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
          :clear="props.clearAll"
          @create-section="handleCreateSection"
          @focus-section="handleFocus"
          @delete-section="handleDelete"
          @currentSec="getSection"
          @focus-comp="handleFocusComp"
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
