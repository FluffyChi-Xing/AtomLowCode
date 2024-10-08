<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string;
  title?: string;
  desc?: string;
}>(), {
  title: '特性卡片',
  desc: '特性卡片描述'
})
</script>

<template>
  <div class="w-full h-[170px] p-4 rounded-[10px] cursor-pointer bg-backgroundGray overflow-hidden">
    <!-- icon -->
    <div class="w-full h-14 flex mb-4">
      <div class="w-14 h-14 text-[20px] flex items-center justify-center rounded-[10px] bg-[#E7E8EC] overflow-hidden">
        {{ icon }}
      </div>
    </div>
    <div
        style="height: calc(100% - 72px)"
        class="w-full h-full flex flex-col"
    >
      <!-- title -->
      <div class="w-full h-1/2 flex whitespace-nowrap text-ellipsis font-bold items-center text-[15px]">
        {{ title }}
      </div>
      <!-- description -->
      <div class="w-full h-1/2 flex whitespace-nowrap text-ellipsis text-gray-500 items-center text-[15px]">
        {{ desc }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
