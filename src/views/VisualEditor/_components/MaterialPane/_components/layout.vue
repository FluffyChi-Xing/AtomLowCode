<script setup lang="ts">
import BaseComponent from '../BaseComponent/index.vue'
import LayoutComponent from '../LayoutComponent/index.vue'
import FormComponent from '../FormComponent/index.vue'
import chartsComponent from '../ChartComponent/index.vue'
const props = withDefaults(defineProps<{
  componentName?: string;
}>(), {
  componentName: 'base'
})

enum componentTypes {
  BaseComponent = 'base',
  ChartComponent = 'chart',
  BusinessComponent = 'business',
  LayoutComponent = 'layout',
  FormComponent = 'form',
  BlockComponent = 'block'
}

function checkComponent(index: string) {
  switch (index) {
    case 'base':
      return BaseComponent
    case 'chart':
      return chartsComponent
    case 'business':
      return componentTypes[index]
    case 'layout':
      return LayoutComponent
    case 'form':
      return FormComponent
    case 'block':
      return componentTypes[index]
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
