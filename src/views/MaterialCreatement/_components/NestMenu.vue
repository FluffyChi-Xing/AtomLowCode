<script setup lang="ts">
import {Menu} from "@element-plus/icons-vue";


const props = withDefaults(defineProps<{
  data?: any[];
}>(), {

})
</script>

<template>
  <div
      v-for="item in props.data"
      :key="item?.index"
      class="w-full h-auto flex flex-col"
  >
    <el-sub-menu
        v-if="item?.children"
        :index="item?.index"
    >
      <template #title>
        <el-icon><Menu /></el-icon>
        <span>{{ item.label }}</span>
      </template>
      <NestMenu :data="item?.children" />
    </el-sub-menu>
    <el-menu-item
        v-else
        :index="item?.index"
    >
      <span>{{ item.label }}</span>
    </el-menu-item>
  </div>
</template>

<style scoped>

</style>
