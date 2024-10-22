<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import DocumentDetail from "@/views/MaterialCreatement/_components/DocumentDetail.vue";
import DocumentMenu from "@/views/MaterialCreatement/_components/DocumentMenu.vue";




interface menuTypes {
  label: string;
  index: string;
  children?: menuTypes[];
}
/** ===== 目录初始化-start ===== **/
const currentActive = ref<string>('1-1');
const menuData = ref<menuTypes[]>([
  {
    label: '入门',
    index: '1',
    children: [
      {
        label: '简介',
        index: '1-1',
      },
      {
        label: '试用低代码demo',
        index: '1-2',
      },
      {
        label: '快速开始',
        index: '1-3',
      }
    ],
  },
  {
    label: '创建编辑器',
    index: '2',
    children: [
      {
        label: '创建新页面',
        index: '2-1',
      },
      {
        label: '创建画布',
        index: '2-2',
      }
    ]
  },
  {
    label: '组件',
    index: '3',
    children: [
      {
        label: '基础组件',
        index: '3-1',
      },
      {
        label: '表单组件',
        index: '3-2',
      },
      {
        label: '布局组件',
        index: '3-3',
      }
    ]
  }
])


function checkDocName() {
  switch (currentActive.value) {
    case '1-1':
      return 'intro'
    case '1-2':
      return 'demo'
    default:
      return 'intro'
  }
}

onMounted(() => {
  checkDocName();
})

function handleSelect(index: any) {
  currentActive.value = index;
  checkDocName();
}
/** ===== 目录初始化-end ===== **/
</script>

<template>
  <div class="w-full h-full flex">
    <!-- left menu -->
    <div class="w-60 h-full flex flex-col ">
      <DocumentMenu
          :data="menuData"
          :default-active="'1-1'"
          @update="handleSelect"
      />
    </div>
    <!-- main view -->
    <div
        style="width: calc(100% - 240px)"
        class="h-full flex flex-col p-4"
    >
      <DocumentDetail
          :mark-name="checkDocName()"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
