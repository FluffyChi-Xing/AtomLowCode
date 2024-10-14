<script setup lang="ts">
import { ref } from 'vue'
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
  type: 'fetch',
  requestType: 'GET',
  isAuto: true,
  isCross: true,
  delayTime: 5000,
  dataUrl: 'mock/index.json',
  disabled: true
})

const dataType = ref<string>(props.type)
const dataId = ref<number>(props.dataId)
const autoReq = ref<boolean>(props.isAuto)
const dataUrl = ref<string>(props.dataUrl)
const requestType = ref<string>(props.requestType)
const crossOrigin = ref<boolean>(props.isCross)
const delayTime = ref<number>(props.delayTime)

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
            v-model="dataId"
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
            v-model="dataUrl"
            clearable
            placeholder="请输入请求地址"
            class="w-full"
            :disabled="props.disabled"
        />
      </el-form-item>
      <el-form-item required label="请求方法">
        <el-select
            v-model="requestType"
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
            v-model="crossOrigin"
            :disabled="props.disabled"
        />
      </el-form-item>
      <el-form-item label="超时时长">
        <el-input-number
            v-model="delayTime"
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
