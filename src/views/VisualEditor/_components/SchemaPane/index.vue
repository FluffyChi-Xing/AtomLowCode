<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getSessionCode} from "@/views/VisualEditor/_componsables/hooks/useVisualData";


const schemaCode = ref<string>('')
function getSession() {
  schemaCode.value = getSessionCode();
}

onMounted(() => {
  getSession()
})
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <el-scrollbar class="w-full h-full">
      <div
          v-if="schemaCode"
          class="w-full h-full flex"
      >
        <highlightjs
            language="json"
            :code="JSON.stringify(schemaCode, null, 2)"
            class="text-[10px]"
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
