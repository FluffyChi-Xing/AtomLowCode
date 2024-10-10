<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import DraggableTansitionGroup from "@/views/VisualEditor/_components/DraggableTansitionGroup.vue";
import DraggableItem from "@/views/VisualEditor/_components/DraggableItem.vue";
import ComponentRender from "@/views/VisualEditor/_componsables/render/component-render";


const props = withDefaults(defineProps<{
  list?: any[];
  drag?: boolean;
  label?: string;
  isShow?: boolean;
}>(), {
  isShow: false
})


const section = ref() // 获取容器
const emits = defineEmits(['createSection', 'focusSection', 'deleteSection'])
const tempList = ref<any[]>(props.list)
const text = computed(() => {
  if (!tempList.value?.length) {
    return '拖动组件或模板到此处'
  } else {
    return ''
  }
})

function createSection() {
  emits('createSection')
}

function handleFocus() {
  emits('focusSection', props.label)
}

function handleDelete() {
  emits('deleteSection', props.label)
}

watch(() => tempList.value, () => {
  console.log(`${props.label}tempList:`, tempList.value)
})
</script>

<template>
  <div
      @click="handleFocus"
      ref="section"
      class="w-full h-auto min-h-8 flex section-item items-center my-2"
      :class="isShow ? 'is-active' : ''"
  >
    <el-scrollbar class="w-full h-full relative">
      <DraggableTansitionGroup
          v-model="tempList"
          :group="{ name: 'people', pull: true, put: true}"
          item-key="id"
          animation="150"
          class="w-full h-full grid grid-cols-3 gap-1 p-4"
          :class="drag"
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
      <!-- tooltip -->
      <span class="text-gray-500 w-full absolute h-8 justify-center top-0 items-center flex">{{ text }}</span>
    </el-scrollbar>
  </div>
  <!-- 选中 section 后的工具栏 -->
  <div
      v-if="isShow"
      class="w-10 h-8 flex justify-center items-center ml-auto"
  >
    <el-button @click="handleDelete" icon="Delete" type="primary" size="small" />
  </div>
  <!-- 新建 section -->
  <div class="w-full h-auto flex">
    <el-divider
        direction="horizontal"
        border-style="dashed"
    >
      <el-button @click="createSection" icon="Plus" size="small" type="primary">创建分区</el-button>
    </el-divider>
  </div>
</template>

<style scoped>
@import "../style/simulator.scss";

:deep(.el-divider) {
  border-color: #409eff !important;
}
</style>
