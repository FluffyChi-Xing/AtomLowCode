<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import {useKeyGetComp} from "@/componsabels/utils/utils";
const props = withDefaults(defineProps<{
  data?: any;
}>(), {

})

const renderComp = ref<any>(null);
async function renderPreview() {
  try {
    if (props.data?.preview) {
      // console.log('执行 preview 初始化', props.data)
      renderComp.value = props.data
    } else {
      await disposePreview(props.data);
    }
  } catch (e) {
    // 默认执行 disposePreview
    // console.log('执行 disposePreview 初始化', e)
    await disposePreview(props.data);
  }
}
function disposePreview(element: any): any {
  useKeyGetComp(element?.key).then((res: any) => {
    renderComp.value = res
  })
}





onMounted(async () => {
 await renderPreview();
})

watch(() => props.data, async () => {
  await renderPreview();
})
</script>

<template>
  <component
      class="w-full h-full flex"
      :is="renderComp?.preview()"
  />
</template>

<style scoped>

</style>
