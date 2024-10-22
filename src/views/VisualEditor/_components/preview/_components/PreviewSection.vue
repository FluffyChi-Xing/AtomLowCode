<script setup lang="ts">
import PreviewComponent from "@/views/VisualEditor/_components/preview/_components/PreviewComponent.vue";
import {onMounted} from "vue";
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  sectionData?: any;
}>(), {

})

const componentList = ref<any[]>(props?.sectionData);

onMounted(() => {
  componentList.value = props.sectionData;
});
</script>

<template>
  <div class="w-full h-full min-h-8 flex flex-col items-center mb-2">
    <PreviewComponent
        v-for="(item, index) in componentList"
        :key="index"
        :component="item"
    />
  </div>
</template>

<style scoped>

</style>
