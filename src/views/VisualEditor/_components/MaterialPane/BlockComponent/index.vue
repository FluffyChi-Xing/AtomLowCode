<script setup lang="ts">
import DraggableItem from "@/views/VisualEditor/_components/DraggableItem.vue";
import DraggableTansitionGroup from "@/views/VisualEditor/_components/DraggableTansitionGroup.vue";
import {computed, ref} from "vue";
import {cloneDeep} from "lodash-es";
import {createNewBlock} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {visualConfig} from "@/componsabels/visual-config";

const blockComponent = ref(visualConfig.componentModules.blockComponents);

const rows = computed(() => {
  return `grid-rows-${Math.ceil(blockComponent.value.length / 3) + 1}`;
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
  <div
      v-if="blockComponent?.length"
      class="w-full h-full flex"
  >
    <DraggableTansitionGroup
        v-model="blockComponent"
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
  </div>
  <div
      v-else
      class="w-full h-ful justify-center items-center"
  >
    <el-empty
        description="暂无组件"
    />
  </div>
</template>

<style scoped>
@import "../../simulator/style/simulator.scss";
</style>
