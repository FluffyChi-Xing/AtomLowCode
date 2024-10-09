<script setup lang="ts">
import BaseComponent from '../BaseComponent/index.vue'
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
      return componentTypes[index]
    case 'business':
      return componentTypes[index]
    case 'layout':
      return componentTypes[index]
    case 'form':
      return componentTypes[index]
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
