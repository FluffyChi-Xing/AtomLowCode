<script setup lang="ts">
import {onMounted, ref} from "vue";
import initJson from '@/init.json'
import {getSessionCode, localKey} from "@/views/VisualEditor/_componsables/hooks/useVisualData";
import {$message} from "@/componsabels/Element-Plus";


const schemaCode = ref<string>('')
function getSession() {
  schemaCode.value = getSessionCode();
}

function refresh() {
  getSession()
  $message({
    type: "success",
    message: "刷新成功",
    offset: 80
  })
}


/**
 * 导出schema执行函数
 * @param item
 */
function excuteExport(item: string) {
  return new Promise((resolve, reject) => {
    try {
      const jsonData = JSON.stringify(JSON.parse(item), null, 2);
      const blob = new Blob([ jsonData ], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schema.json';
      a.click();
      URL.revokeObjectURL(url); // 释放URL 对象
      document.body.removeChild(a);// 移除a标签
      resolve(true)
    } catch (e) {
      console.error(e)
      reject(false)
    }
  })
}


/**
 * 导出schema
 */
function exportSchema() {
  const sessionData = sessionStorage.getItem(localKey) as string;
  if (sessionData) {
    excuteExport(sessionData).then((res: boolean) => {
      if (res) {
        console.log('导出成功')
        $message({
          type: "success",
          message: "导出成功",
          offset: 80
        })
      } else {
        $message({
          type: "error",
          message: "导出失败",
          offset: 80
        })
      }
    })
  } else {
    const sessionData = JSON.parse(JSON.stringify(initJson));
    excuteExport(sessionData).then((res: boolean) => {
      if (res) {
        $message({
          type: "success",
          message: "导出成功",
          offset: 80
        })
      } else {
        $message({
          type: "error",
          message: "导出失败",
          offset: 80
        })
      }
    })
  }
}

onMounted(() => {
  getSession()
})
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <el-scrollbar class="w-full h-full">
      <!-- 刷新schema -->
      <el-form-item label="刷新schema">
        <div class="w-full h-auto flex items-center justify-end">
          <el-button-group>
            <el-button size="small" icon="Refresh" @click="refresh" type="primary">刷新</el-button>
            <el-button size="small" icon="Upload" @click="exportSchema" type="primary">导出</el-button>
          </el-button-group>
        </div>
      </el-form-item>
      <div
          v-if="schemaCode"
          class="w-full h-full flex"
      >
        <highlightjs
            language="json"
            :code="JSON.stringify(schemaCode, null, 2)"
            class="text-[10px] w-full h-full"
        />
      </div>
      <div
          v-else
          class="w-full h-full items-center justify-center flex flex-col"
      >
        <el-empty
            description="暂无数据"
        />
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>

</style>
