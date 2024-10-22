<script setup lang="ts">
import { MdPreview, MdCatalog } from 'md-editor-v3';
import {onMounted, ref, watch} from "vue";
import {$docApi} from "@/views/MaterialCreatement/_componsables/apis";
const props = withDefaults(defineProps<{
  markName?: string;
}>(), {
  markName: 'intro'
})


/** ===== md文档初始化-start ===== **/
const mdDocument = ref<string>(props.markName);
const scrollElement = document.documentElement;
const editorId = ref<string>('preview-only')

function checkDocument() {
  mdDocument.value = $docApi.HomeDoc[props.markName];
  console.log('文档更新')
}



onMounted(() => {
  checkDocument();
})

watch(() => props.markName, () => {
  checkDocument();
})
/** ===== md文档初始化-end ===== **/
</script>

<template>
  <div class="w-full h-full flex px-4">
    <MdPreview
        v-model="mdDocument"
        :editorId="editorId"
        :htmlPreview="true"
        theme="light"
        style="height: 100%;width: 100%;"
        previewTheme="vuepress"
    />
    <MdCatalog :editorId="editorId" :scrollElement="scrollElement" />
  </div>
</template>

<style scoped>

</style>
