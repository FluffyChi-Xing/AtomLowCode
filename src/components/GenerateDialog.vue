<script setup lang="ts">
import {ref, watch} from "vue";
const props = withDefaults(defineProps<{
  visible?: boolean;
  title?: string;
  width?: string | number;
  destroy?: boolean;
  draggable?: boolean;
  showClose?: boolean;
}>(), {
  visible: false,
  width: 500,
  title: '通用弹窗',
  destroy: false,
  draggable: false,
  showClose: false
})

const isShow = ref<boolean>(props.visible)
const emits = defineEmits(['confirm', 'cancel'])

function handleCancel() {
  emits('cancel', false)
}

function handleConfirm() {
  emits('confirm', false)
}

watch(() => props.visible, (val) => {
  isShow.value = val
})
</script>

<template>
  <div class="w-auto h-auto flex">
    <el-dialog
        v-model="isShow"
        :destroy-on-close="destroy"
        :width="width"
        :draggable="draggable"
        :show-close="showClose"
        :close-on-click-modal="false"
    >
      <template
          v-if="title"
          #header
      >
        <span class="font-bold">{{ title }}</span>
      </template>
      <slot name="main" />
      <template #footer>
        <el-button @click="handleConfirm" type="primary" icon="Select">确认</el-button>
        <el-button @click="handleCancel" type="danger" icon="CircleClose" class="ml-4">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>

</style>
