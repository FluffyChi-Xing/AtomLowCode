<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';

const props = withDefaults(defineProps<{
  defaultActive?: string;
}>() ,{
  defaultActive: 'center'
})



const currentTab = ref<string>(props.defaultActive);
interface tabTypes {
  label: string;
  value: string;
}
const tabOptions = ref<tabTypes[]>([
  {
    label: '物料中心',
    value: 'center'
  },
  {
    label: '文档中心',
    value: 'doc'
  }
])
const emits = defineEmits(['tabChange'])

function changeTab(index: string) {
  emits('tabChange', index)
}

function checkActive() {
  currentTab.value = props.defaultActive;
}

onMounted(() => {
  checkActive();
})

watch(() => props.defaultActive, () => {
  checkActive();
})
</script>

<template>
  <div class="w-full h-full flex px-5 justify-start">
    <div class="w-1/2 h-full flex items-center">
      <!-- website logo -->
      <span class="w-[100px] h-full flex object-contain site-logo" />
      <!-- tags banner -->
      <div
          style="width: calc(100% - 100px)"
          class="h-full flex items-center"
      >
        <el-tabs
            v-model="currentTab"
            class="ml-10 h-full"
            @tabChange="changeTab"
        >
          <el-tab-pane
              v-for="(item, index) in tabOptions"
              :label="item.label"
              :name="item.value"
              :key="index"
          />
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site-logo {
  background-image: url("@/assets/img/logo-no-background.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

:deep(.el-tabs__header) {
  margin-bottom: 2px;
  &.is-top {
    margin-bottom: 2px;
  }
}

:deep(.el-tabs__nav-wrap:after) {
  display: none;
}
</style>
