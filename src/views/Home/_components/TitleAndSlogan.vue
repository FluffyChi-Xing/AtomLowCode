<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
function quickStart() {
  router.push('/atom')
}
</script>

<template>
  <div class="w-full max-w-[1280px] h-1/2 flex mt-20">
    <!-- title and slogan -->
    <div class="w-1/2 h-full flex flex-col p-4">
      <div class="text-[50px] font-bold title-eng">ATOMCODE</div>
      <div class="w-full h-auto text-[#5e3535] flex font-bold text-[50px] whitespace-pre-line">
        基于Vue3.0+TS的可视化低代码平台
      </div>
      <div class="w-full h-auto flex text-[20px] text-[#3c3c43c7] font-bold">
        让开发更简单，让创意更自由
      </div>
      <!-- quick route btns -->
      <div class="w-full h-auto flex mt-5">
        <el-button @click="quickStart" round size="large" class="theme-btn">快速开始</el-button>
      </div>
    </div>
    <!-- logo -->
    <div class="w-1/2 h-full flex items-center relative justify-center">
      <div class="w-[300px] h-[300px] flex logo-bg top-2/3" />
      <div class="text-[300px] text-theme font-bold absolute">A</div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/Element-Plus.scss";
.title-eng {
  background: -webkit-linear-gradient(120deg, theme('colors.darkTheme') -80%, theme('colors.theme'));
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.logo-bg {
  background: -webkit-linear-gradient(-90deg, theme('colors.theme') 50%, theme('colors.darkTheme'));
  filter: blur(72px);
}
</style>
