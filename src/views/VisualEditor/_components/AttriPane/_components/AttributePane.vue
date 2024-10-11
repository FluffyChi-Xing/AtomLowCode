<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
const props = withDefaults(defineProps<{
  data?: any;
}>(), {

})

const componentContent = ref<string>(props.data?.label)
const componentType = ref<string>(props.data?.props?.type?.defaultValue)
const emits = defineEmits(['update:type'])
function clearContent() {
  componentContent.value = ''
}

function initData() {
  componentContent.value = props.data?.label
  componentType.value = props.data?.props?.type?.defaultValue
}

function changeType() {
  emits('update:type', componentType.value)
}

watch(() => componentType.value, () => {
  changeType()
})

onMounted(() => {
  console.log('data:', props.data?.props?.type)
})

watch(() => props.data, () => {
  initData()
})
</script>

<template>
  <div class="w-full h-auto flex flex-col p-4 mt-4 bg-white">
    <!-- 组件内容 -->
    <el-form-item
        :label="`${props.data?.label}内容`"
    >
      <el-input
          v-model="componentContent"
          clearable
          placeholder="请输入组件内容"
          class="w-full"
          @clear="clearContent"
      />
    </el-form-item>
    <!-- 组件类型 -->
    <el-form-item
        v-if="props.data?.props?.type"
        :label="`${props.data?.label}类型`"
    >
      <el-radio-group
          v-model="componentType"
          size="small"
      >
        <el-radio
            v-for="(item, index) in props.data?.props?.type.options"
            :key="index"
            :value="item.value"
            :label="item.label"
        />
      </el-radio-group>
    </el-form-item>
  </div>
</template>

<style scoped>

</style>
