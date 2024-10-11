<script setup lang="ts">
import {ref, watch} from "vue";
import { useRouter } from "vue-router";
import TheHeader from "@/views/MaterialCreatement/_components/TheHeader.vue";
import { useRoute } from "vue-router";


const router = useRouter();
const route = useRoute();
const currentRoute = ref<string>(route.path);
const currentTab = ref<string>('center');

function handleCurrentTab(index: string) {
  currentTab.value = index;
}

watch(() => route.path, (val) => {
  currentRoute.value = val;
  console.log(currentRoute.value)
})
</script>

<template>
  <div class="w-screen h-screen flex bg-[#F7F8FA]">
    <!-- left -->
    <div
        style="width: calc(100% - 40px)"
        class="h-full flex flex-col"
    >
      <!-- header -->
      <div class="w-full h-10 flex pr-1 box-border the-header">
        <div class="w-full h-full flex bg-white">
          <TheHeader
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
    <div class="w-10 h-full flex flex-col bg-white">
      <span></span>
    </div>
  </div>
</template>

<style scoped>
.the-header {
  border-bottom: 1px solid theme('colors.border');
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 299;
}
</style>
