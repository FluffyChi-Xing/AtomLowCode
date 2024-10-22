<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useKeyGetComp} from "@/componsabels/utils/utils";
const props = withDefaults(defineProps<{
  component?: any;
}>(), {

})


/** ===== 组件预览初始化-start ===== **/
const comp = ref<any>(null);

function checkComponent() {
  // 只有当预览组件传值时走这个逻辑
  if (props.component) {
    // 正常情况下页面预览时的组件渲染逻辑
    useKeyGetComp(props.component).then((res: any) => {
      comp.value = res
    });
  }
}

onMounted(() => {
  checkComponent()
})
/** ===== 组件预览初始化-end ===== **/
</script>

<template>
  <div class="w-full h-auto mb-1 flex">
    <component
        class="w-full h-full"
        :is="comp?.preview()"
    />
  </div>
</template>

<style scoped>

</style>
