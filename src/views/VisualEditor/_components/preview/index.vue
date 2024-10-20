<script setup lang="ts">
import {onMounted, ref} from 'vue'
import initJson from '@/init.json'
import {localKey} from "@/views/VisualEditor/_componsables/hooks/useVisualData";
import {$message} from "@/componsabels/Element-Plus";
import PreviewSection from "@/views/VisualEditor/_components/preview/_components/PreviewSection.vue";


/** ===== 页面预览器初始化-start ===== **/
const localData = ref<any>();


function getLocalData() {
  // 清空localData
  localData.value = null;
  const pageData = JSON.parse(sessionStorage.getItem(localKey) as string);
  // 如果sessionStorage中有数据
  try {
    if (pageData) {
      localData.value = pageData.page[0];
    } else {
      // 如果sessionStorage中没有数据
      const pageData = JSON.parse(JSON.stringify(initJson));
      localData.value = pageData.page[0];
    }
  } catch (e) {
    console.log(e)
    $message({
      type: 'error',
      message: '数据解析错误',
      offset: 80
    })
  }
}

onMounted(() => {
  console.log('preview 预览器弹出')
  getLocalData();
})
/** ===== 页面预览器初始化-end ===== **/
</script>

<template>
  <div class="w-full h-full max-h-[550px] flex flex-col p-4">
    <el-scrollbar height="550" class="w-full h-full">
      <PreviewSection
          v-for="(item, index) in localData?.section"
          :key="index"
          :section-data="item?.component"
      />
    </el-scrollbar>
  </div>
</template>

<style scoped>
:deep(.ell-scrollbar__view) {
  width: 100%;
  height: 100%;
}
</style>
