<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import GenerateDialog from "@/components/GenerateDialog.vue";
import {$message} from "@/componsabels/Element-Plus";
import { useRouter } from "vue-router";
import {MaterialCenterTypes} from "@/views/MaterialCreatement/_componsables/apis/materialCenterTypes";
import {localKey} from "@/views/VisualEditor/_componsables/hooks/useVisualData";
import Preview from "@/views/VisualEditor/_components/preview/index.vue";
import initJson from "@/init.json";
import {visualConfig} from "@/componsabels/visual-config";

const currentTab = ref<string>('myPages');
const isPreview = ref<boolean>(false)
const previewSize = ref<number>(1100)
const router = useRouter();
interface tabTypes {
  label: string;
  value: string;
}
const tabOptions = ref<tabTypes[]>([
  {
    label: '我的页面',
    value: 'myPages'
  },
  {
    label: '我的组件',
    value: 'myComps'
  },
  {
    label: '我的资产包',
    value: 'myAssets'
  },
  {
    label: '全部组件',
    value: 'allComps'
  }
])

const tableData = ref<MaterialCenterTypes.materialTableTypes[]>([])
watch(() => currentTab.value, (val: any) => {
  if (val !== 'myPages') {
    tableData.value = []
    // getPageOrComp()
  } else {
    getPageOrComp()
  }
})
/** ===== 新建组件弹框初始化-start ===== **/
const dialogVisible = ref<boolean>(false)
const newCompName = ref<string>('')
const newCompLabel = ref<string>('')
const newPageRoute = ref<string>('')

function createNewComp() {
  dialogVisible.value = true
}

function handleConfirm(index: boolean) {
  if (newCompName.value && newCompLabel.value) {
    createComp(newCompName.value, newCompLabel.value)
    dialogVisible.value = index
  } else {
    $message({
      type: "warning",
      message: "请填写完整信息"
    })
  }
}

function handleCancel(index: boolean) {
  dialogVisible.value = index
}

function clearName() {
  newCompName.value = ''
}

function clearLabel() {
  newCompLabel.value = ''
}

function clearRoute() {
  newPageRoute.value = ''
}

function createComp(name: string, label: string) {
  tableData.value.push({
    index: tableData.value?.length + 1,
    version: '1.0.0',
    type: '低代码组件',
    label: label,
    name: name
  })
}


function getPageOrComp() {
  // 获取页面
  if (currentTab.value === 'myPages') {
    const sessionData = sessionStorage.getItem(localKey) as string
    if (sessionData) {
      const session = JSON.parse(sessionData)
      if (session?.page) {
        session.page?.forEach((item: any, index: number) => {
          tableData.value.push({
            index: index + 1,
            name: item?.title,
            version: '1.0.0',
            type: '低代码页面',
            label: item?.title
          })
        })
      }
    }
  }
  // 获取组件
  if (currentTab.value === 'myComps') {
    console.log('全部组件')
    Object.entries(visualConfig.componentMap)?.forEach(([key, module]) => {
      tableData.value?.push({
        index: tableData.value?.length + 1,
        name: key,
        version: '1.0.0',
        type: '低代码组件',
        label: module?.label
      })
    })
  }
}

function createComponent(row: any, tab: string) {
  if (tab === 'myPages') {
    router.push('/atom/visualEditor')
  } else {
    router.push(`/atom/materialCreate/workspace${row.name}&${row.label}`)
  }
}

onMounted(() => {
  getPageOrComp()
})


watch(() => currentTab.value, () => {
  tableData.value = []
  getPageOrComp()
})
/** ===== 新建组件弹框初始化-end ===== **/

/** ===== 组件预览弹框初始化-start ===== **/
const currentComp = ref<any>(); // 当前组件

function checkPreSize(index: number) {
  const localData = JSON.parse(sessionStorage.getItem(localKey) as string || JSON.stringify(initJson))
  const size = localData.page[index]?.size
  if (size) {
    previewSize.value = size?.width
  } else {
    previewSize.value = 1100
  }
}
function cancelPre() {
  isPreview.value = false
}

function confirmPre() {
  isPreview.value = false
}


function handlePreview(index: number) {
  // 组件预览逻辑
  if (currentTab.value !== 'myPages') {
    previewSize.value = 1100
    // component key
    currentComp.value = tableData.value[index]?.name
  } else {
    checkPreSize(index);
    currentComp.value = ''
  }
  isPreview.value = true
}
/** ===== 组件预览弹框初始化-end ===== **/

/** ===== 删除组件/页面弹窗初始化-start ===== **/
const isDelete = ref<boolean>(false)
const deleteItem = ref<string>('')

function cancelDelete() {
  isDelete.value = false
}

function confirmDelete() {
  isDelete.value = false
}

function handleDelete(item: string) {
  isDelete.value = true
  deleteItem.value = `你确定要删除 ${item} 吗?`
}
/** ===== 删除组件/页面弹窗初始化-end ===== **/
</script>

<template>
  <div class="w-full h-full flex">
    <el-card
        shadow="never"
        class="w-full h-full"
    >
      <!-- tab switch -->
      <div class="w-full h-10 flex items-center">
        <el-tabs
            v-model="currentTab"
            class="w-full h-full"
        >
          <el-tab-pane
              v-for="(item, index) in tabOptions"
              :key="index"
              :label="item.label"
              :name="item.value"
          />
        </el-tabs>
      </div>
      <!-- el table -->
      <div
          style="height: calc(100% - 56px)"
          class="w-full flex flex-col mt-4"
      >
        <!-- 表头操作栏 -->
        <div class="w-full h-10 flex items-center">
          <el-button @click="createNewComp" icon="CirclePlus" type="primary" class="mr-4">
            {{ currentTab === 'myPages' ? '新建页面' : '新建组件' }}
          </el-button>
          <el-button icon="Link" disabled>
            {{ currentTab === 'myPages' ? '构建页面' : '构建资产包'}}
          </el-button>
        </div>
        <!-- 表主体 -->
        <div
            style="height: calc(100% - 80px)"
            class="w-full flex flex-col"
        >
          <el-table
              :data="tableData"
              stripe
              highlight-current-row
              fit
              :header-cell-style="{background: '#f5f7fa', color: '#909399'}"
          >
            <el-table-column
                type="selection"
                width="100"
            />
            <el-table-column
                label="序号"
                prop="index"
            />
            <el-table-column
                :label="currentTab === 'myPages' ? '页面标题' : '组件标题'"
                prop="label"
            />
            <el-table-column
                :label="currentTab === 'myPages' ? '页面名称' : '组件名称'"
                prop="name"
            />
            <el-table-column
                :label="currentTab === 'myPages' ? '版本' : '组件版本'"
                prop="version"
            />
            <el-table-column
                label="类型"
                prop="type"
                width="100"
            >
              <template #default="{row}">
                <el-tag size="small" type="success">{{ row?.type }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
                label="操作"
            >
             <template #default="{row}">
               <div class="w-full h-full flex">
                 <el-button
                     @click="createComponent(row, currentTab)"
                     type="text"
                     size="small"
                     class="mr-2"
                     :disabled="currentTab!=='myPages'"
                 >
                   {{ currentTab === 'myPages' ? '编辑页面' : '编辑组件' }}
                 </el-button>
                 <el-button @click="handlePreview(row.index - 1)" type="text" size="small" class="mr-2">
                   {{ currentTab === 'myPages' ? '预览页面' : '预览组件' }}
                 </el-button>
                 <el-button @click="handleDelete(row.label)" type="text" size="small">删除</el-button>
               </div>
             </template>
            </el-table-column>
            <template #empty>
              <el-empty
                  :description="currentTab === 'myPages' ? '暂无页面' : '暂无组件'"
              />
            </template>
          </el-table>
        </div>
        <!-- pagination -->
        <div class="w-full h-10 flex justify-end items-center">
          <el-pagination layout="prev, pager, next" background :total="50" />
        </div>
      </div>
    </el-card>
    <!-- 新建组件弹框 -->
    <GenerateDialog
        v-model:visible="dialogVisible"
        :title="currentTab === 'myPages' ? '新建页面' : '新建组件'"
        @confirm="handleConfirm"
        @cancel="handleCancel"
    >
      <template #main>
        <div class="w-full h-auto">
          <el-form-item
              required
              :label="currentTab === 'myPages' ? '页面标题' : '组件标题'"
          >
            <el-input
                v-model="newCompName"
                clearable
                class="w-full"
                :placeholder="currentTab === 'myPages' ? '请输入页面标题' : '请输入组件标题'"
                @clear="clearName"
            />
          </el-form-item>
          <el-form-item
              required
              :label="currentTab === 'myPages' ? '页面名称' : '组件名称'"
          >
            <el-input
                v-model="newCompLabel"
                clearable
                class="w-full"
                :placeholder="currentTab === 'myPages' ? '请输入页面名称' : '请输入组件名称'"
                @clear="clearLabel"
            />
          </el-form-item>
          <el-form-item
              v-if="currentTab === 'myPages'"
              label="页面路由"
              required
          >
            <el-input
                v-model="newPageRoute"
                clearable
                placeholder="请输入页面路由"
                @clear="clearRoute"
                class="w-full"
            />
          </el-form-item>
        </div>
      </template>
    </GenerateDialog>
    <!-- 组件预览弹框 -->
    <GenerateDialog
        v-model:visible="isPreview"
        title="组件预览"
        :destroy="true"
        :width="previewSize"
        :draggable="true"
        @cancel="cancelPre"
        @confirm="confirmPre"
    >
      <template #main>
        <Preview
            :pre-comp="currentComp"
        />
      </template>
    </GenerateDialog>
    <!-- 删除组件/页面弹窗 -->
    <GenerateDialog
        v-model:visible="isDelete"
        :title="deleteItem"
        @cancel="cancelDelete"
        @confirm="confirmDelete"
    >
      <template #main>
        <span class="text-red-500">这将会失去很长时间，请谨慎选择 !</span>
      </template>
    </GenerateDialog>
  </div>
</template>

<style scoped>
:deep(.el-card__body) {
  width: 100%;
  height: 100%;
}
</style>
