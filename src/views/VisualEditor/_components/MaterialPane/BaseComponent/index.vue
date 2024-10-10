<script setup lang="ts">
import {computed, ref} from 'vue'
import { cloneDeep } from 'lodash-es';
import DraggableTansitionGroup from "@/views/VisualEditor/_components/DraggableTansitionGroup.vue";
import DraggableItem from "@/views/VisualEditor/_components/DraggableItem.vue";
import {createNewBlock} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {visualConfig} from "@/componsabels/visual-config";
const tempList = ref<any[]>([
  {people: 'cn', id:1, name: '组件A'},
  {people: 'cn', id: 2, name: '组件B'},
  {people: 'cn', id: 3, name: '组件C'},
  {people: 'us', id: 4, name: '组件D'},
])

const baseComponents = ref(visualConfig.componentModules.baseComponents)

const rows = computed(() => {
  return tempList.value.length % 3 === 0 ? 'grid-rows-3' : 'grid-rows-4'
})

function cloneDog(comp: any) {
  console.log('当前拖动的组件是:', comp)
  const newComp = cloneDeep(comp);
  return createNewBlock(newComp);
}

function log(evt) {
  console.log('onChange:', evt);
}
</script>

<template>
  <DraggableTansitionGroup
      v-model="baseComponents"
      :group="{ name: 'components', pull: 'clone', put: false}"
      item-key="key"
      class="w-full h-full grid grid-cols-3 gap-1 px-4"
      :class="[rows, cloneDog]"
      @change="log"
  >
    <template #item="{element, index}">
      <DraggableItem
          :index="index"
          :element="element"
      />
    </template>
  </DraggableTansitionGroup>
</template>

<style scoped>
.component-item {
  cursor: pointer;
  margin-top: 10px;
  transition: all .2s ease-in-out;
  border: 1px solid theme('colors.border');
}

.component-item:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
}
</style>
