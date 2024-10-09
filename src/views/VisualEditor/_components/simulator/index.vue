<script setup lang="ts">
import {computed, ref} from 'vue';
import DraggableTansitionGroup from "@/views/VisualEditor/_components/DraggableTansitionGroup.vue";
import DraggableItem from "@/views/VisualEditor/_components/DraggableItem.vue";


defineOptions({
  name: 'SimulatorEditor',
});


const list1 = [
  {people: 'cn', id:1, name: '组件A'},
  {people: 'cn', id: 2, name: '组件B'},
  {people: 'cn', id: 3, name: '组件C'},
  {people: 'us', id: 4, name: '组件D'},
]

const tempList = ref<any[]>([])
const drag = ref<boolean>(false)
const rows = computed(() => {
  if (tempList.value?.length) {
    return tempList.value?.length % 3 === 0 ? 'grid-rows-3' : 'grid-rows-4'
  } else {
    return '';
  }
})

// 选择要操作的组件
// const selectComp = (element: VisualEditorBlockTypes) => {
//   setCurrentBlock(element);
//   currentPage.value.blocks.forEach((block) => {
//     block.focus = element._vid == block._vid;
//     block.focusWithChild = false;
//     handleSlotsFocus(block, element._vid);
//     element.focusWithChild = false;
//   });
// };

function onAdd(item: any) {
  console.log('添加了:', item)
}
</script>

<template>
  <div class="w-full h-full flex">
<!--    <DraggableTansitionGroup-->
<!--        v-model:drag="drag"-->
<!--        class="!min-h-680px"-->
<!--        draggable=".item-drag"-->
<!--    >-->
<!--      <template #item="{ element: outElement }">-->
<!--        <div-->
<!--            class="w-full h-auto flex flex-col"-->
<!--            :data-label="outElement?.label"-->
<!--            :class="{-->
<!--              focus: outElement?.focus,-->
<!--              focusWithChild: outElement?.focusWithChild,-->
<!--              drag,-->
<!--              ['has-slot']: !!Object.keys(outElement?.props.slots || {}).length,-->
<!--            }"-->
<!--        >-->
<!--          <component-render-->
<!--              :key="outElement?._vid"-->
<!--              :element="outElement"-->
<!--              :style="{-->
<!--                pointerEvents: Object.keys(outElement?.props?.slots || {}).length-->
<!--                  ? 'auto'-->
<!--                  : 'none',-->
<!--              }"-->
<!--          >-->
<!--            <template-->
<!--                v-for="(item, slotKey) in outElement?.props?.slots"-->
<!--                :key="slotKey"-->
<!--                #[slotKey]-->
<!--            >-->
<!--              <SlotItem-->
<!--                  v-model:children="item.children"-->
<!--                  v-model:drag="drag"-->
<!--                  :slot-key="slotKey"-->
<!--                  :on-contextmenu-block="null"-->
<!--                  :select-comp="null"-->
<!--              />-->
<!--            </template>-->
<!--          </component-render>-->
<!--        </div>-->
<!--      </template>-->
<!--    </DraggableTansitionGroup>-->
    <el-scrollbar class="w-full h-full">
      <DraggableTansitionGroup
          v-model="tempList"
          :group="{ name: 'people', pull: true, put: true}"
          item-key="id"
          animation="150"
          class="w-full h-full grid grid-cols-3 gap-1 p-4"
          :class="[rows]"
          @add="onAdd"
      >
        <template #item="{ element, index }">
          <transition-group>
            <DraggableItem
                :element="element"
                :index="index"
            />
          </transition-group>
        </template>
      </DraggableTansitionGroup>
    </el-scrollbar>
  </div>
</template>

<style scoped>
:deep(.el-scrollbar__view) {
  width: 100%;
  height: 100%;
}
</style>
