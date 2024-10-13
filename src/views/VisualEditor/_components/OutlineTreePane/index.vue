<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {SectionTypes} from "@/views/VisualEditor/_componsables/api/sectionTypes";
import TreeComponents from "@/views/VisualEditor/_components/OutlineTreePane/_components/treeComponents.vue";

const props = withDefaults(defineProps<{
  list?: SectionTypes.pageSection[],
}>(), {

})

const treeData = ref<SectionTypes.pageSection[]>();
function checkCurrentList() {
  treeData.value = props.list;
}
onMounted(() => {
  checkCurrentList()
})
// TODO 大纲树在删除components时数据异常，等待修复
watch(() => props.list, () => {
  checkCurrentList()
})
</script>

<template>
  <div class="w-full h-full flex flex-col items-center">
    <div
        v-if="treeData?.length"
        class="w-full h-full flex flex-col"
    >
      <el-scrollbar
          class="w-full h-full"
      >
        <TreeComponents
            :list="treeData"
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
