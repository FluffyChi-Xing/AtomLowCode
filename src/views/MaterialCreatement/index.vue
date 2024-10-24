<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import { useRouter } from "vue-router";
import TheHeader from "@/views/MaterialCreatement/_components/TheHeader.vue";
import { useRoute } from "vue-router";


const router = useRouter();
const route = useRoute();
const currentRoute = ref<string>(route.path);
const currentTab = ref<string>('center');

/** ===== tab切换-start ===== **/
function handleCurrentTab(index: string) {
  currentTab.value = index;
  switch (index) {
    case 'center':
      router.push('/atom/materialCreate')
          break;
    case 'doc':
      router.push('/atom/materialCreate/document')
          break;
  }
}


function checkCurrent() {
  currentRoute.value = route.path;
  switch (currentRoute.value) {
    case '/atom/materialCreate':
      currentTab.value = 'center';
      break;
    case '/atom/materialCreate/document':
      currentTab.value = 'doc';
      break;
  }
}

onMounted(() => {
  checkCurrent();
})

watch(() => route.path, (val) => {
  currentRoute.value = val;
  console.log(currentRoute.value)
})

/** ===== tab切换-end ===== **/

/** ===== github 仓库链接初始化-start ===== **/
const githubImg = ref<string>('src/assets/img/github.svg')
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
  <div class="w-screen h-screen flex bg-[#F7F8FA]">
    <!-- left -->
    <div
        style="width: calc(100% - 40px)"
        class="h-full flex flex-col"
    >
      <!-- header -->
      <div class="w-full h-10 flex pr-1 box-border shadow-md">
        <div class="w-full h-full flex bg-white">
          <TheHeader
              :default-active="currentTab"
              @tab-change="handleCurrentTab"
          />
        </div>
      </div>
      <!-- main -->
      <div
          style="height: calc(100% - 40px)"
          class="w-full flex flex-col px-10 pt-4 pb-10"
      >
        <div class="w-full h-full flex flex-col bg-white">
          <RouterView />
        </div>
      </div>
    </div>
    <!-- right -->
    <div class="w-10 h-full flex flex-col shadow-md bg-white py-10">
      <!-- github link -->
      <div class="w-10 h-10 flex">
        <el-tooltip
            content="github"
            effect="dark"
            placement="left"
        >
          <img :src="githubImg" @click="jumpGithub" loading="lazy" alt="" class="w-full h-full flex object-contain cursor-pointer" />
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
