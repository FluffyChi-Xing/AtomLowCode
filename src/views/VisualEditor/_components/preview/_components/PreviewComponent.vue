<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {visualConfig} from "@/componsabels/visual-config";
const props = withDefaults(defineProps<{
  component?: any;
}>(), {

})


/** ===== 组件预览初始化-start ===== **/
const comp = ref<any>(null);

function checkComponent() {
  if (props.component) {
    const moduleName = props?.component?.key;
    const component = visualConfig.componentMap[moduleName];
    comp.value = component;
    console.log('components', comp.value)
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
