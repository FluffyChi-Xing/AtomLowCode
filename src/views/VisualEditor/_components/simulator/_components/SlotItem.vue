<script setup lang="ts">
import {PropType, ref} from 'vue';
import DraggableTansitionGroup from "@/views/VisualEditor/_components/DraggableTansitionGroup.vue";
import type {VisualEditorBlockTypes} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {useVModel} from "@vueuse/core";
import ComponentRender from "@/views/VisualEditor/_componsables/render/component-render";



defineOptions({
  name: 'SlotItem',
});

const props = defineProps({
  slotKey: {
    type: String as PropType<string | number>,
    default: '',
  },
  drag: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  children: {
    type: Array as PropType<VisualEditorBlockTypes[]>,
    default: () => [],
  },
  selectComp: {
    type: Function as PropType<(comp: VisualEditorBlockTypes) => void>,
    required: true,
  },
  onContextmenuBlock: {
    type: Function as PropType<
        (
            e: MouseEvent,
            block: VisualEditorBlockTypes,
            parentBlocks?: VisualEditorBlockTypes[],
        ) => void
    >,
    required: true,
  },
});
const emits = defineEmits(['update:children', 'on-selected', 'update:drag']);


const isDrag = useVModel(props, 'drag', emits);
const slotChildren = useVModel(props, 'children', emits);


// 选中组件
props.children?.some((item) => {
  item.focus && props.selectComp(item);
})
</script>

<template>
  <DraggableTansitionGroup
      v-model="slotChildren"
      v-model:drag="isDrag"
      class="relative"
      :class="{ slot: !slotChildren?.length}"
      draggable=".item-drag"
      :data-slot="`插槽(${ slotKey }) \n 拖拽组件到此处`"
  >
    <template #item="{ element: innerElement}">
      <div
          :data-label="innerElement?.label"
          :class="{
            focus: innerElement?.focus,
            focusWithChild: innerElement?.focusWithChild,
          }"
      >
        <ComponentRender
            :element="innerElement"
            :style="{
              pointerEvents: Object.keys(innerElement?.props?.slots || {}).length
                  ? 'auto'
                  : 'none',
            }"
        >
          <template
              v-for="(item, index) in innerElement?.props?.slots"
              :key="index"
              #[index]
          >
            <SlotItem
                v-model:children="item.children"
                v-model:drag="isDrag"
                :slot-key="index"
                :on-contextmenu-block="onContextmenuBlock"
                :select-comp="selectComp"
            />
          </template>
        </ComponentRender>
      </div>
    </template>
  </DraggableTansitionGroup>
</template>

<style scoped>
.inner-draggable {
  position: relative;
}

.inner-draggable.slot::after {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  height: auto;
  min-height: 40px;
  font-size: 12px;
  color: #8591a2;
  text-align: center;
  background: rgba(246, 247, 249, 0.5);
  content: attr(data-slot);
  outline: 1px dashed #dedede;
  outline-offset: -1px;
  flex-direction: column;
  justify-content: center;
}
</style>
