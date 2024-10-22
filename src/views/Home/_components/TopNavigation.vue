<script setup lang="ts">
import { ref } from 'vue';
/** ===== github 仓库链接初始化-start ===== **/
const githubLink = ref<string>('https://github.com/FluffyChi-Xing/AtomLowCode')

/**
 * 跳转到 github 仓库
 */
function jumpGithub() {
  // 新窗口打开
  window.open(githubLink.value);
}
/** ===== github 仓库链接初始化-end ===== **/
</script>

<template>
  <div class="w-full h-14 absolute top-0 box-border navigation left-0 items-center flex justify-between px-5">
    <!-- site logo -->
    <span class="site-logo" />
    <!-- github logo -->
    <span @click="jumpGithub" class="github-logo cursor-pointer" />
  </div>
</template>

<style scoped>
.site-logo {
  width: 100px;
  height: 100%;
  background-image: url("@/assets/img/logo-no-background.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.github-logo {
  width: 40px;
  height: 40px;
  background-image: url("@/assets/img/github.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.navigation {
  border-bottom: 1px solid theme('colors.border');
}
</style>
