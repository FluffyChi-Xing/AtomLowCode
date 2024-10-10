<script setup lang="ts">
import {ref} from 'vue';
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";
import type {SectionTypes} from "@/views/VisualEditor/_componsables/api/sectionTypes";
import {$notify} from "@/componsabels/Element-Plus";
import type {
  VisualEditorBlockTypes,
  VisualEditorComponent
} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";


defineOptions({
  name: 'SimulatorEditor',
});

const simulator = ref() // 获取模拟器容器
const list1 = [
  {people: 'cn', id:1, name: '组件A'},
  {people: 'cn', id: 2, name: '组件B'},
  {people: 'cn', id: 3, name: '组件C'},
  {people: 'us', id: 4, name: '组件D'},
]

const sectionList = ref<SectionTypes.pageSection[]>([
  {
    index: 1,
    label: 'section1',
    isShow: false
  }
])
const tempList = ref<VisualEditorBlockTypes[]>([])
const drag = ref<boolean>(false)
const emits = defineEmits(['focusComp', 'currentSec'])

// 选择要操作的组件
// const selectComp = (element: VisualEditorBlockTypes) => {
//   setCurrentBlock(element);
//   currentPage.value.blocks.forEach((block) => {
//     block.focus = element._vid == block._vid;
//     block.focusWithChild = false;
//     handleSlotsFocus(block, element._vid);
//     element.focusWithChild = false;
//   });
// };


/**
 * 处理添加页面端函数
 */
function handleCreateSection() {
  // 向容器内添加一个新的sectionItem组件
  const base = sectionList.value.length
  sectionList.value.push({
    index: base + 1,
    label: `section${base + 1}`
  })
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

function handleDelete(index: string) {
  if (sectionList.value.length > 1) {
    sectionList.value.find((item: SectionTypes.pageSection) => {
      if (item.label === index) {
        sectionList.value.splice(sectionList.value.indexOf(item), 1)
      }
    })
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
          :list="tempList"
          :drag="drag"
          :is-show="item.isShow"
          @create-section="handleCreateSection"
          @focus-section="handleFocus"
          @delete-section="handleDelete"
          @focus-comp="handleFocusComp"
          @currentSec="getSection"
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
