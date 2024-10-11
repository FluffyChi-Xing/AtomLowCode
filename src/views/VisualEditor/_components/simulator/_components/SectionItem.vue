<script setup lang="ts">
import {computed, ref, watch} from 'vue';
import DraggableTansitionGroup from "@/views/VisualEditor/_components/DraggableTansitionGroup.vue";


const props = withDefaults(defineProps<{
  list?: any[];
  drag?: boolean;
  label?: string;
  isShow?: boolean;
}>(), {
  isShow: false
})


const section = ref() // 获取容器
const isDrag = ref<boolean>(props.drag)
const emits = defineEmits(['createSection', 'focusSection', 'deleteSection', 'focusComp', 'currentSec'])
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

function handleFocusComp(index: number) {
  console.log('tempList:', tempList.value)
  tempList.value = tempList.value.map((item, i) => {
    if (i === index) {
      emits('focusComp', item) // 当前选中的组件
      emits('currentSec', props.label) // 当前组件所在的section
      return { ...item, focus: true };
    } else {
      return { ...item, focus: false };
    }
  });
}

function handleDeleteComp(index: number) {
  console.log('删除了', tempList.value[index].key)
  tempList.value.splice(index, 1);
}

watch(() => tempList.value, () => {
  console.log(`${props.label}tempList:`, tempList.value)
})
</script>

<template>
  <div
      @click="handleFocus"
      ref="section"
      class="w-full h-auto min-h-8 flex section-item items-center bg-white my-2"
      :class="isShow ? 'is-active' : ''"
  >
    <el-scrollbar class="w-full h-full flex flex-col relative">
      <DraggableTansitionGroup
          v-model="tempList"
          v-model:drag="isDrag"
          :group="{ name: 'components', pull: false, put: true}"
          item-key="key"
          animation="150"
          class="w-full h-full grid grid-rows-1 gap-1 p-4"
          :class="drag"
      >
        <template #item="{ element, index }">
          <transition-group>
            <div
                :key="index"
                class="w-full h-full flex relative"
                @click="handleFocusComp(index)"
            >
              <component
                  class="w-full h-full flex"
                  :is="element?.preview()"
              />
              <!-- 删除组件 -->
              <div
                  v-if="element?.focus"
                  class="absolute rounded-[3px] w-auto text-[10px] justify-center bg-[#006CFF] z-[299] text-white cursor-pointer items-center h-4 flex left-0 top-[-16px]"
              >
                <span @click="handleDeleteComp(index)">删除</span>
              </div>
              <div
                  v-if="element?.focus"
                  class="absolute rounded-[3px] mr-2 w-auto text-[10px] justify-center bg-[#006CFF] z-[299] text-white cursor-pointer items-center h-4 flex left-[25px] top-[-16px]"
              >
                <span>{{ element?.key }}</span>
              </div>
            </div>
          </transition-group>
        </template>
      </DraggableTansitionGroup>
      <!-- tooltip -->
      <span
          v-if="text"
          class="text-gray-500 w-full absolute h-8 justify-center top-0 items-center flex"
      >
        {{ text }}
      </span>
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
