<script setup lang="ts">
import {onMounted, ref} from 'vue';
import TreeComponents from "@/views/VisualEditor/_components/OutlineTreePane/_components/treeComponents.vue";
import {getSessionCode} from "@/views/VisualEditor/_componsables/hooks/useVisualData";
import {$message} from "@/componsabels/Element-Plus";

const sessionData = ref<any>();


function initSession() {
  return new Promise((resolve, reject) => {
    try {
      sessionData.value = getSessionCode()?.page[0];
      resolve(null)
    } catch (e) {
      reject(e)
    }
  })
}

function refreshData() {
  initSession()
      .then(() => {
        $message({
          type: 'success',
          message: '刷新成功',
          offset: 80
        })
      })
      .catch((e) => {
        console.log(e)
    $message({
      type: 'danger',
      message: '错误',
      offset: 80
    })
  })
  console.log(sessionData.value)
}
onMounted(() => {
  initSession()
})
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <div
        v-if="sessionData"
        class="w-full h-full flex flex-col"
    >
      <el-scrollbar
          class="w-full h-full"
      >
        <el-form-item label="刷新">
          <div class="w-full h-auto flex items-center justify-end">
            <el-button type="primary" icon="Refresh" @click="refreshData">刷新</el-button>
          </div>
        </el-form-item>
        <TreeComponents
            :list="sessionData"
        />
      </el-scrollbar>
    </div>
    <div
        v-else
        class="w-full h-auto flex justify-center my-auto"
    >
      <el-empty
          description="暂无数据"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
