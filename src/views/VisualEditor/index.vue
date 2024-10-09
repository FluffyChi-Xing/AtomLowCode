<script setup lang="ts">
import {ref, watch} from 'vue'
import ActionPane from "@/views/VisualEditor/_components/ActionPane.vue";
import SideActionPane from "@/views/VisualEditor/_components/SideActionPane.vue";
import {$message} from "@/componsabels/Element-Plus";
import {AddLocation, DeleteLocation} from "@element-plus/icons-vue";
import DataBindPane from "@/views/VisualEditor/_components/DataBindPane.vue";
import MaterialPane from '@/views/VisualEditor/_components/MaterialPane/index.vue'


/** ===== 画布尺寸调节-start ===== **/
const canvasSize = ref<number>(1100)

function changeSize(index: number) {
  canvasSize.value = index
}
/** ===== 画布尺寸调节-end ===== **/

/** ===== 侧边抽屉-start ===== **/
const drawerChoice = ref<string>('')
const isExpand = ref<boolean>(false)
const fixedIcon = ref<any>(AddLocation)
const isFixed = ref<boolean>(false)
const fixedSize = ref<string>('0px')
const searchValue = ref<string>('')
const title = ref<string>('大纲树')
const placeholder = ref<string>('请输入节点名称')
const currentComponent = ref<any>(null)

function initChoice(index: string) {
  drawerChoice.value = index
  checkComponent(index)
  isExpand.value = true
  console.log(index)
}

function checkComponent(index: string) {
  switch (index) {
    case 'material':
      title.value = '物料库'
          placeholder.value = '请输入组件名称'
          currentComponent.value = MaterialPane
          break;
    case 'tree':
      title.value = '大纲树'
          placeholder.value = '请输入节点名称'
          currentComponent.value = ''
          break;
    case 'dataSource':
      title.value = '数据源'
          placeholder.value = '请输入数据源名称'
          currentComponent.value = ''
          break;
    case 'schema':
      title.value = 'Schema'
          placeholder.value = '请输入Schema名称'
          currentComponent.value = ''
          break;
  }
}

function closeDrawer() {
  isExpand.value = false
  isFixed.value = false
  fixedSize.value = '0px'
  fixedIcon.value = AddLocation
  drawerChoice.value = '' // 关闭抽屉时清空当前选择
}
function fixedDrawer() {
  isFixed.value = !isFixed.value
  if (isFixed.value) {
    fixedIcon.value = DeleteLocation
    fixedSize.value = '300px'
  } else {
    fixedIcon.value = AddLocation
    fixedSize.value = '0px'
  }
}
watch(() => drawerChoice.value, (val) => {
  isExpand.value = true
})
/** ===== 侧边抽屉-end ===== **/
</script>

<template>
  <div class="w-screen h-screen flex flex-col bg-backgroundGray">
    <!-- 顶部导航条 -->
    <div class="w-full h-12 flex bg-red-500 mb-0.5">
      <ActionPane
          @size-change="changeSize"
      />
    </div>
    <!-- 工作台 -->
    <div
        style="height: calc(100% - 50px)"
        class="w-full flex relative justify-end pl-12 pr-[300px]"
    >
      <!-- 侧边栏 -->
      <div class="w-12 h-full flex absolute left-0 bg-white">
        <SideActionPane
            @expand="initChoice"
        />
      </div>
      <div
          v-if="isFixed"
          class="w-[300px] h-full flex"
      />
      <!-- 编辑器画布 -->
      <div
          :style="`width: calc(100% - ${fixedSize})`"
          class="h-full canvas p-4 flex justify-center"
      >
        <div
            class="h-full bg-canvas"
            :style="'width: ' + canvasSize + 'px'"
        >

        </div>
      </div>
      <!-- 数据绑定 -->
      <div class="w-[300px] fixed right-0 h-full flex">
        <DataBindPane />
      </div>
    </div>
    <!-- side drawer -->
    <el-drawer
        v-model="isExpand"
        style="height: calc(100% - 50px);margin-top: 50px"
        direction="ltr"
        size="350px"
        :close-on-click-modal="isFixed"
        :modal="false"
        @close="closeDrawer"
    >
      <template #header>
        <div class="w-full h-auto flex flex-col items-center px-4">
          <!-- title -->
          <div class="w-full h-10 flex">
            <span class="w-auto h-full flex font-bold items-center">{{ title }}</span>
            <el-button
                type="text"
                class="ml-auto"
                @click="fixedDrawer"
            >
              <el-icon><component :is="fixedIcon" /></el-icon>
            </el-button>
          </div>
          <!-- search -->
          <el-form-item
              class="w-full h-auto"
          >
            <el-input
                v-model="searchValue"
                clearable
                suffix-icon="Search"
                class="w-full"
                :placeholder="placeholder"
            />
          </el-form-item>
        </div>
      </template>
      <template #default>
        <component :is="currentComponent" />
      </template>
    </el-drawer>
  </div>
</template>

<style scoped>
.canvas {
  transition: all .2s ease-in-out;
}

:deep(.el-drawer) {
  padding-left: 48px !important;
}

:deep(.el-drawer__header) {
  margin-bottom: 0 !important;
}
</style>
