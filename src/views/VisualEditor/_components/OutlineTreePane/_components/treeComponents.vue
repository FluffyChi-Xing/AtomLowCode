<script setup lang="ts">
import {SectionTypes} from "@/views/VisualEditor/_componsables/api/sectionTypes";
import {onMounted, ref, watch} from 'vue';
import {OutlineTreeTypes} from "@/views/VisualEditor/_components/OutlineTreePane/_componsables/apis/outlineTreeTypes";

const props = withDefaults(defineProps<{
  list?: SectionTypes.pageSection[],
  accordion?: boolean,
  expandAll?: boolean;
  showBox?: boolean;
}>(), {
  accordion: false,
  expandAll: true,
  showBox: true
})

const treeData = ref<OutlineTreeTypes.treeLabelTypes[]>([
  {
    label: 'page1',
    children: []
  }
]);

function exchangeList(item: SectionTypes.pageSection[] | []) {
  if (item?.length) {
    let sectionList = [];
    item.forEach((thing: SectionTypes.pageSection) => {
      sectionList.push({
        label: thing.label,
        children: thing.component?.map((comp: any) => {
          return {
            label: comp?.label ? comp.label : '--',
            children: null
          }
        })
      })
    })
    return sectionList;
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
  treeData.value[0].children = exchangeList(props.list);
  // console.log('treePaneChange', props.list)
})

watch(() => props.list, (val) => {
  treeData.value[0].children = exchangeList(val);
})
</script>

<template>
  <div class="w-full h-auto flex flex-col">
    <el-tree
        :data="treeData"
        :props="defaultProps"
        :accordion="accordion"
        :default-expand-all="expandAll"
        :show-checkbox="showBox"
        @check-change="getCheckedNode"
    />
  </div>
</template>

<style scoped>

</style>
