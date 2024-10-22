<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {Menu} from "@element-plus/icons-vue";
import NestMenu from "@/views/MaterialCreatement/_components/NestMenu.vue";

const props = withDefaults(defineProps<{
  data?: any[];
  defaultActive?: string;
}>(), {

})


const defaultActive = ref<string>(props.defaultActive)
const emits = defineEmits(['update'])


function handleUpdate(key: string) {
  emits('update', key)
}

onMounted(() => {
  defaultActive.value = props.defaultActive
  console.log(defaultActive.value)
})

watch(() => props.defaultActive, () => {
  defaultActive.value = props.defaultActive
})
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <el-scrollbar>
      <el-menu
          text-color="#303133"
          active-text-color="#409EFF"
          :default-active="defaultActive"
          style="height: 100%;"
          collapse-transition
          @select="handleUpdate"
      >
        <NestMenu
            :data="props.data"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style scoped>
:deep(.el-scrollbar__view) {
  height: 100%;
  width: 100%;
}
</style>
