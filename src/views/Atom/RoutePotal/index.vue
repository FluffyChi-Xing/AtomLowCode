<script setup lang="ts">
import { useRouter } from "vue-router";


const router = useRouter()

function jump2engine() {
  router.push('/atom/visualEditor')
}

function jump2material() {
  router.push('/atom/materialCreate')
}
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-full max-w-[1280px] h-[300px] flex">
      <!-- 链接区 -->
      <div class="w-1/2 h-full flex flex-col items-center">
        <div class="w-[320px] h-auto flex flex-col">
          <!-- slogan -->
          <div class="w-auto h-auto text-darkTheme flex text-[40px] font-bold">
            企业级低代码平台
          </div>
          <div class="w-auto text-theme h-auto flex text-[40px] font-bold">
            原子低代码
          </div>
          <!-- link -->
          <div
              style="height: calc(100% - 300px)"
              class="w-full flex mt-auto"
          >
            <el-button @click="jump2engine" size="large" class="theme-btn mr-4">低代码引擎</el-button>
            <el-button @click="jump2material" size="large" class="dark-btn">低代码物料</el-button>
          </div>
        </div>
      </div>
      <!-- 图片 -->
      <div class="w-1/2 h-full flex items-center justify-center">
        <span class="w-full h-full flex bg-img" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/Element-Plus.scss";
.bg-img {
  background-image: url("@/assets/img/topicImg.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
</style>
