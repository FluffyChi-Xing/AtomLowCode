<script setup lang="ts">
import { ref } from "vue";
import TopNavigation from "@/views/Home/_components/TopNavigation.vue";
import TitleAndSlogan from "@/views/Home/_components/TitleAndSlogan.vue";
import type {HomeTypes} from "@/componsabels/apis/homeTypes";
import FeatureCard from "@/views/Home/_components/FeatureCard.vue";

/** ===== 特性卡片初始化-start ===== **/
const featureList = ref<HomeTypes.FeatureCardTypes[]>([
  {
    icon: '🚀',
    title: '基于Vue3',
    desc: '使用Vue3作为主要技术栈，支持Composition API'
  },
  {
    icon: '⚡',
    title: 'TS支持',
    desc: '使用TypeScript作为主要开发语言，提高开发效率'
  },
  {
    icon: '🎨',
    title: '美观UI',
    desc: '使用Element Plus作为UI组件库，界面美观'
  }
])
/** ====== 特性卡片初始化-end ====== **/
</script>

<template>
  <div class="w-screen h-screen flex relative">
    <el-scrollbar class="w-full h-full">
      <div class="w-full h-full flex flex-col justify-center items-center">
        <!-- top navigation -->
        <TopNavigation />
        <!-- title & slogan -->
        <TitleAndSlogan />
        <!-- feature card area -->
        <div class="w-full h-1/2 max-w-[1280px] grid grid-cols-3 gap-4">
          <FeatureCard
              v-for="(item, index) in featureList"
              :key="index"
              :title="item.title"
              :desc="item.desc"
              :icon="item.icon"
          />
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped>

</style>
