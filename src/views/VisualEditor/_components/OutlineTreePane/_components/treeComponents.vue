<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {OutlineTreeTypes} from "@/views/VisualEditor/_components/OutlineTreePane/_componsables/apis/outlineTreeTypes";

const props = withDefaults(defineProps<{
  list?: any,
  accordion?: boolean,
  expandAll?: boolean;
  showBox?: boolean;
  draggable?: boolean;
}>(), {
  accordion: false,
  expandAll: true,
  showBox: true,
  draggable: false
})

const treeData = ref<OutlineTreeTypes.treeLabelTypes[]>([]);

/**
 * 处理大纲树 page 级数据
 * @param item
 */
function exchangeList(item: any) {
  console.log('exchangeList', item?.section)
  if (item) {
    const list = [];
    list.push({
      label: item?.title, // page 级别
      children: disposeList(item?.section)
    })
    return list;
  } else {
    return [];
  }
}


/**
 * 处理大纲树 section 级及以下数据
 * @param section
 */
function disposeList(section: any[]) {
  if (section?.length) {
    let list = [];
    section?.forEach((item: any) => {
      list.push({
        label: item?.label,
        children: disposeList(item?.component)
      })
    })
    return list
  } else {
    return []
  }
}

const defaultProps = {
  children: 'children',
  label: 'label'
}
const emits = defineEmits(['checkedNode']);

function getCheckedNode(index: OutlineTreeTypes.treeLabelTypes) {
  emits('checkedNode', index);
}

onMounted(() => {
  treeData.value = exchangeList(props.list);
})


watch(() => props.list, () => {
  treeData.value = exchangeList(props.list);
})
</script>

<template>
  <div class="w-full h-auto flex flex-col">
    <el-tree
        :data="treeData"
        :props="defaultProps"
        :accordion="accordion"
        :draggable="draggable"
        :default-expand-all="expandAll"
        :show-checkbox="showBox"
        @check-change="getCheckedNode"
    />
  </div>
</template>

<style scoped>

</style>
