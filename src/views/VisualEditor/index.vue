<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import ActionPane from "@/views/VisualEditor/_components/ActionPane.vue";
import SideActionPane from "@/views/VisualEditor/_components/SideActionPane.vue";
import Simulator from './_components/simulator/index.vue'
import {AddLocation, DeleteLocation} from "@element-plus/icons-vue";
import DataBindPane from "@/views/VisualEditor/_components/AttriPane/DataBindPane.vue";
import MaterialPane from '@/views/VisualEditor/_components/MaterialPane/index.vue'
import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {SectionTypes} from "@/views/VisualEditor/_componsables/api/sectionTypes";
import OutlineTreePane from '@/views/VisualEditor/_components/OutlineTreePane/index.vue'
import DataSourcePane from '@/views/VisualEditor/_components/DataSourcePane/index.vue'
import {DataSourceTypes} from "@/views/VisualEditor/_components/DataSourcePane/_componsables/apis/DataSourceTypes";
import CreateDataSourceForm from "@/views/VisualEditor/_components/createDataSourceForm.vue";
import GenerateDialog from "@/components/GenerateDialog.vue";
import SchemaPane from '@/views/VisualEditor/_components/SchemaPane/index.vue'
import {$message} from "@/componsabels/Element-Plus";


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
const currentNode = ref<VisualEditorComponent>(null)
const currentSection = ref<string>('')
const sectionList = ref<SectionTypes.pageSection[]>([
  {
    index: 1,
    label: 'section1',
    isShow: false,
    component: []
  }
])
const dataSourceDrawer = ref<boolean>(false)
const currentCard = ref<DataSourceTypes.dataCardTypes>()
const dataPaneTitle = ref<string>(`创建数据源 ${currentCard.value?.type}`)
const secondDrawerDisabled = ref<boolean>(true)
const deleteCard = ref<boolean>(false)
const deleteName = ref<string>()
const deleteCardTitle = computed(() => `你确定要删除 ${deleteName.value} 吗？`)
const isCreateCard = ref<boolean>(false)
const newCardNode = ref<any>(null)

function initChoice(index: string) {
  drawerChoice.value = index
  checkComponent(index)
  isExpand.value = true
  if (index !== 'dataSource') {
    dataSourceDrawer.value = false
  }
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
          currentComponent.value = OutlineTreePane
          break;
    case 'dataSource':
      title.value = '数据源'
          placeholder.value = '请输入数据源名称'
          currentComponent.value = DataSourcePane
          break;
    case 'schema':
      title.value = 'Schema'
          placeholder.value = '请输入Schema名称'
          currentComponent.value = SchemaPane
          break;
  }
}

function closeDrawer() {
  isExpand.value = false
  isFixed.value = false
  fixedSize.value = '0px'
  fixedIcon.value = AddLocation
  drawerChoice.value = '' // 关闭抽屉时清空当前选择
  dataSourceDrawer.value = false
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
function checkCurrentNode(index: VisualEditorComponent) {
  currentNode.value = index
}

function getCurrentSec(index: string) {
  currentSection.value = index
}

// 数据源配置 drawer 初始化
function syncSectionList(index: SectionTypes.pageSection[]) {
  sectionList.value = index
}

function syncView(index: DataSourceTypes.sourcePaneMes) {
  dataSourceDrawer.value = index.expand;
  currentCard.value = index.value
  secondDrawerDisabled.value = true
  dataPaneTitle.value = `查看数据源`
}

function syncEdit(index: DataSourceTypes.sourcePaneMes) {
  dataSourceDrawer.value = index.expand;
  currentCard.value = index.value
  secondDrawerDisabled.value = false
  dataPaneTitle.value = `编辑数据源 ${index.value?.type}`
}

function syncDelete(index: any) {
  deleteCard.value = true
  deleteName.value = index.name ? index.name : '--'
}
function createCard(index: string) {
  dataSourceDrawer.value = true
  secondDrawerDisabled.value = false
  // currentCard.value.type = index
  dataPaneTitle.value = `创建数据源 ${index}`
  isCreateCard.value = true
}

// 删除数据源卡片弹框
function handleCancel(index: boolean) {
  deleteCard.value = index
}

function handleConfirm(index: boolean) {
  deleteCard.value = index
  $message({
    type: 'success',
    message: '删除成功',
    offset: 80
  })
}

// 新建数据源
function handleCreate(index: any) {
  newCardNode.value = index
  dataSourceDrawer.value = false
}


watch(() => drawerChoice.value, () => {
  isExpand.value = true
})
/** ===== 侧边抽屉-end ===== **/

/** ===== 页面重置-start ===== **/
const isReset = ref<boolean>(false)
function handleReset() {
  isReset.value = !isReset.value
}
/** ===== 页面重置-end ===== **/

/** ===== 事件绑定-start ===== **/
const deleteEvent = ref<boolean>(false)
const deleteInfo = ref<any>(null)

function handleDeleteEvent(index: any) {
  deleteInfo.value = index
  deleteEvent.value = true
}

function deleteCancel() {
  deleteEvent.value = false
}
/** ===== 事件绑定-end ===== **/
</script>

<template>
  <div class="w-screen h-screen flex flex-col bg-[#EDEFF3]">
    <!-- 顶部导航条 -->
    <div class="w-full h-12 flex bg-red-500 mb-0.5">
      <ActionPane
          @size-change="changeSize"
          @reset-page="handleReset"
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
          <Simulator
              :clear-all="isReset"
              @focus-comp="checkCurrentNode"
              @currentSec="getCurrentSec"
              @upload-section="syncSectionList"
          />
        </div>
      </div>
      <!-- 数据绑定 -->
      <div class="w-[300px] fixed right-0 h-full flex">
        <DataBindPane
            :current-node="currentNode"
            :current-sec="currentSection"
            @delete-event="handleDeleteEvent"
        />
      </div>
    </div>
    <!-- side drawer -->
    <el-drawer
        v-model="isExpand"
        style="height: calc(100% - 50px);margin-top: 50px;padding-left: 48px !important;"
        direction="ltr"
        size="350px"
        :close-on-click-modal="isFixed"
        :modal="false"
        :modal-class="['mask-layer']"
        :show-close="!dataSourceDrawer"
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
        <component
            :is="currentComponent"
            :list="sectionList"
            :newCard="newCardNode"
            @syncView="syncView"
            @syncEdit="syncEdit"
            @syncDelete="syncDelete"
            @createCards="createCard"
        />
      </template>
    </el-drawer>
    <!-- second level drawer -->
    <el-drawer
        v-model="dataSourceDrawer"
        direction="ltr"
        size="600px"
        style="height: calc(100% - 50px);margin-top: 50px;border-left: 1px solid #EDEFF3"
        :close-on-click-modal="isFixed"
        :modal="false"
        :modal-class="['mask-2layer']"
        :show-close="false"
    >
      <template #header>
        <span class="text-gray-500 font-bold">{{ dataPaneTitle }}</span>
      </template>
      <div class="w-full h-auto flex flex-col">
        <CreateDataSourceForm
            :type="currentCard?.type"
            :data-id="currentCard?.id"
            :card-name="currentCard?.name"
            :disabled="secondDrawerDisabled"
            :is-create="isCreateCard"
            @create="handleCreate"
        />
      </div>
    </el-drawer>
    <!-- delete data card dialog -->
    <GenerateDialog
        v-model:visible="deleteCard"
        :title="deleteCardTitle"
        @cancel="handleCancel"
        @confirm="handleConfirm"
    >
      <template #main>
        <span class="text-red-500 font-bold">
          一旦删除，这些数据可能会失去，请谨慎操作！
        </span>
      </template>
    </GenerateDialog>
    <!-- delete event dialog -->
    <GenerateDialog
        v-model:visible="deleteEvent"
        :title="`你确定要删除 ${deleteInfo?.label} 的 ${deleteInfo?.event} 事件吗？`"
        @cancel="deleteCancel"
    >
      <span class="text-red-500 font-bold">
        一旦删除，这些数据可能会失去，请谨慎操作！
      </span>
    </GenerateDialog>
  </div>
</template>

<style scoped>
.canvas {
  transition: all .2s ease-in-out;
}

:deep(.el-drawer) {
  box-shadow: none !important;
}

:deep(.el-drawer__header) {
  margin-bottom: 0 !important;
}

:deep(.mask-layer) {
  width: 348px !important;
}

:deep(.mask-2layer) {
  width: 600px !important;
  margin-left: 350px;
}
</style>
