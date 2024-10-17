<script setup lang="ts">
import BaseComponent from '../BaseComponent/index.vue'
import LayoutComponent from '../LayoutComponent/index.vue'
import FormComponent from '../FormComponent/index.vue'
import chartsComponent from '../ChartComponent/index.vue'
import blockComponent from '../BlockComponent/index.vue'
import businessComponent from "../BusinessComponent/index.vue";
const props = withDefaults(defineProps<{
  componentName?: string;
}>(), {
  componentName: 'base'
})

function checkComponent(index: string) {
  switch (index) {
    case 'base':
      return BaseComponent
    case 'chart':
      return chartsComponent
    case 'business':
      return businessComponent
    case 'layout':
      return LayoutComponent
    case 'form':
      return FormComponent
    case 'block':
      return blockComponent
  }
}
</script>

<template>
  <div class="w-full h-auto flex">
    <component :is="checkComponent(props.componentName)" />
  </div>
</template>

<style scoped>

</style>
