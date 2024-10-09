<script setup lang="ts">
import {computed, ref} from 'vue';
import draggable from 'vuedraggable';
import {useVModel} from "@vueuse/core";
defineOptions({
  name: 'DraggableTransitionGroup',
});

/** ===== 拖动区域初始化-start ===== **/
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  drag: {
    type: Boolean,
    default: false,
  },
  itemKey: {
    type: String,
    default: '_vid',
  },
  group: {
    type: Object,
    default: () => ({ name: 'components' }),
  },
  fallbackClass: String,
});
const emits = defineEmits(['update:modelValue', 'update:drag']);
const list = useVModel(props, 'modelValue', emits); // 拖动区域数据
const isDrag = useVModel(props, 'drag', emits); // 是否拖动
/**
 * 拖动配置
 * @type {ComputedRef<{animation: number, scroll: boolean, ghostClass: string, disabled: boolean}>}
 */
const dragOptions = computed(() => {
  return {
    animation: 200,
    scroll: true,
    ghostClass: 'ghost',
    disabled: false,
  };
})
/** ===== 拖动区域初始化-end ===== **/
</script>

<template>
  <draggable
      v-model="list"
      :class="{ isDrag }"
      :group="group"
      :item-key="itemKey"
      :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !isDrag ? 'flip-list' : null,
        }"
      v-bind="{...dragOptions, ...$attrs}"
  >
    <template #item="item">
      <div
          :class="{ 'item-drag' : item.element.draggable }"
          :data-el="item.element.draggable"
      >
        <slot name="item" v-bind="item" />
      </div>
    </template>
  </draggable>
</template>

<style scoped>
.ghost {
  background: #fff2f3;
  opacity: 0.5;
}
</style>
