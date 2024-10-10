<script setup lang="ts">
import {ArrowRight} from "@element-plus/icons-vue";

withDefaults(defineProps<{
  currentSection?: string;
  currentPage?: string;
  currentComponent?: string;
}>(), {

})
</script>

<template>
  <div class="w-full h-full flex items-center">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item>{{ currentPage }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ currentSection }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ currentComponent }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style scoped>

</style>
