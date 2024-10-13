<script setup lang="ts">
import { ref } from 'vue'
import {DataSourceTypes} from "@/views/VisualEditor/_components/DataSourcePane/_componsables/apis/DataSourceTypes";
import DataSourceCard from "@/views/VisualEditor/_components/DataSourcePane/_components/DataSourceCard.vue";

interface dataSourceTypes {
  label: string;
  value: string;
}

/** ===== 新建数据源选择-start ===== **/
const sourceTypes = ref<string>()
const defaultOptions = ref<dataSourceTypes[]>([
  {
    label: 'fetch',
    value: 'fetch'
  },
  {
    label: 'jsonb',
    value: 'jsonb'
  }
])
/** ===== 新建数据源选择-end ===== **/

/** ===== 数据源初始化-start ===== **/
const dataSourceList = ref<DataSourceTypes.dataCardTypes[]>([
  {
    name: '数据源A',
    type: 'fetch',
    id: 1
  }
])
/** ===== 数据源初始化-end ===== **/
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <!-- selection -->
    <div class="w-full h-10 flex items-center box-border data-source">
      <el-select
          v-model="sourceTypes"
          placeholder="新建数据源"
          style="width: 150px"
          class="mr-2"
      >
        <el-option
            v-for="(item, index) in defaultOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
      <el-button-group>
        <el-button type="text" size="small">导入</el-button>
        <el-button type="text" size="small">导出</el-button>
      </el-button-group>
    </div>
    <!-- data source card -->
    <div
        style="height: calc(100% - 56px)"
        class="w-full flex flex-col items-center mt-4"
    >
      <el-scrollbar class="w-full h-full">
        <div
            v-if="defaultOptions?.length"
            class="w-full h-auto flex flex-col"
        >
          <DataSourceCard
              v-for="(item, index) in dataSourceList"
              :key="index"
              :data-name="item.name"
              :data-types="item.type"
          />
        </div>
        <div
            v-else
            class="w-full h-auto flex"
        >
          <el-empty
              description="暂无数据"
          />
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped>
.data-source {
  border-bottom: 1px solid theme('colors.border');
}
</style>
