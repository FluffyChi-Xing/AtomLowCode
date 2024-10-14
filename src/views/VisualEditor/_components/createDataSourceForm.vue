<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
const props = withDefaults(defineProps<{
  type?: string;
  dataId?: number;
  isAuto?: boolean;
  dataUrl?: string;
  requestType?: string;
  isCross?: boolean;
  delayTime: number;
  disabled?: boolean;
}>(), {
  requestType: 'GET',
  isAuto: true,
  isCross: true,
  delayTime: 5000,
  dataURL: 'mock/index.json',
  disabled: true
})

const dataType = ref<string>()
const dataID = ref<number>()
const autoReq = ref<boolean>()
const DataUrl = ref<string>()
const RequestType = ref<string>()
const CrossOrigin = ref<boolean>()
const DelayTime = ref<number>()

function initData() {
  dataType.value = props.type
  dataID.value = props.dataId
  autoReq.value = props.isAuto
  DataUrl.value = props.dataUrl
  RequestType.value = props.requestType
  CrossOrigin.value = props.isCross
  DelayTime.value = props.delayTime
}


const requestTypeList = [
  {
    label: 'GET',
    value: 'GET'
  },
  {
    label: 'POST',
    value: 'POST'
  },
  {
    label: 'PUT',
    value: 'PUT'
  },
  {
    label: 'DELETE',
    value: 'DELETE'
  },
]

onMounted(() => {
  initData()
})

watch(() => props.type, () => {
  initData()
})
</script>

<template>
  <div class="w-full h-auto flex flex-col">
    <el-form label-width="auto">
      <el-form-item required label="类型">
        <el-input
            v-model="dataType"
            clearable
            placeholder="请输入数据源类型"
            class="w-full"
            :disabled="props.disabled"
        />
      </el-form-item>
      <el-form-item label="数据源 ID">
        <el-input
            v-model="dataID"
            clearable
            placeholder="请输入数据源 ID"
            class="w-full"
            :disabled="props.disabled"
        />
      </el-form-item>
      <el-form-item label="是否自动请求">
        <el-switch
            v-model="autoReq"
            size="default"
            :disabled="props.disabled"
        />
      </el-form-item>
      <el-form-item required label="请求地址">
        <el-input
            v-model="DataUrl"
            clearable
            placeholder="请输入请求地址"
            class="w-full"
            :disabled="props.disabled"
        />
      </el-form-item>
      <el-form-item required label="请求方法">
        <el-select
            v-model="RequestType"
            placeholder="请选择请求方法"
            :disabled="props.disabled"
        >
          <el-option
              v-for="(item, index) in requestTypeList"
              :key="index"
              :value="item.value"
              :label="item.label"
          />
        </el-select>
      </el-form-item>
      <el-form-item required label="是否支持跨域">
        <el-switch
            v-model="CrossOrigin"
            :disabled="props.disabled"
        />
      </el-form-item>
      <el-form-item label="超时时长">
        <el-input-number
            v-model="DelayTime"
            :min="0"
            :max="15000"
            step="100"
            :disabled="props.disabled"
        />
      </el-form-item>
      <el-form-item v-if="!props.disabled" label="操作">
        <el-button class="theme-btn">确认修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
@import "@/assets/css/Element-Plus.scss";
</style>
