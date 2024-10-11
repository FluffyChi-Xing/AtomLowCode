<script setup lang="ts">
import { ref } from "vue";
import GenerateDialog from "@/components/GenerateDialog.vue";
import {$message} from "@/componsabels/Element-Plus";
import { useRouter } from "vue-router";
import {MaterialCenterTypes} from "@/views/MaterialCreatement/_componsables/apis/materialCenterTypes";

const currentTab = ref<string>('myComps');
const router = useRouter();
interface tabTypes {
  label: string;
  value: string;
}
const tabOptions = ref<tabTypes[]>([
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

/** ===== 新建组件弹框初始化-start ===== **/
const dialogVisible = ref<boolean>(false)
const newCompName = ref<string>('')
const newCompLabel = ref<string>('')

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

function createComp(name: string, label: string) {
  tableData.value.push({
    index: tableData.value?.length + 1,
    version: '1.0.0',
    type: '低代码组件',
    label: label,
    name: name
  })
}

function createComponent(row: any) {
  router.push(`/atom/materialCreate/workspace${row.name}&${row.label}`)
}
/** ===== 新建组件弹框初始化-end ===== **/
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
          <el-button @click="createNewComp" icon="CirclePlus" type="primary" class="mr-4">开发新组件</el-button>
          <el-button icon="Link" disabled>构建资产包</el-button>
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
                label="组件标题"
                prop="label"
            />
            <el-table-column
                label="组件名称"
                prop="name"
            />
            <el-table-column
                label="版本"
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
                 <el-button @click="createComponent(row)" type="text" size="small" class="mr-2">开发组件</el-button>
                 <el-button type="text" size="small" class="mr-2">导出组件</el-button>
                 <el-button type="text" size="small">删除</el-button>
               </div>
             </template>
            </el-table-column>
            <template #empty>
              <el-empty
                  description="暂无组件数据"
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
        title="开发组件"
        @confirm="handleConfirm"
        @cancel="handleCancel"
    >
      <template #main>
        <div class="w-full h-auto">
          <el-form-item
              required
              label="组件标题"
          >
            <el-input
                v-model="newCompName"
                clearable
                class="w-full"
                placeholder="请输入组件标题"
                @clear="clearName"
            />
          </el-form-item>
          <el-form-item
              required
              label="组件名称"
          >
            <el-input
                v-model="newCompLabel"
                clearable
                class="w-full"
                placeholder="请输入组件名称"
                @clear="clearLabel"
            />
          </el-form-item>
        </div>
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
