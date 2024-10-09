<script setup lang="ts">
import {Menu} from "@element-plus/icons-vue";

withDefaults(defineProps<{
  index?: number | string;
  icon?: any;
  element?: any;
}>(), {
  icon: Menu
})
</script>

<template>
  <div
      :key="index"
      class="w-full h-full max-h-[100px] bg-white flex-col p-4 select-none text-[10px] justify-center items-center rounded-[2px] component-item flex"
  >
    <!-- icon -->
    <div
        style="height: calc(100% - 15px)"
        class="w-full flex justify-center items-center"
    >
      <el-icon style="font-size: 20px"><component :is="icon" /></el-icon>
    </div>
    <!-- label -->
    <span class="w-full h-auto flex items-center  justify-center whitespace-pre-line text-ellipsis">{{ element?.name }}</span>
  </div>
</template>

<style scoped>

</style>
