<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getSessionCode} from "@/views/VisualEditor/_componsables/hooks/useVisualData";
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
          <el-button icon="Refresh" @click="refresh" type="primary">刷新</el-button>
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
