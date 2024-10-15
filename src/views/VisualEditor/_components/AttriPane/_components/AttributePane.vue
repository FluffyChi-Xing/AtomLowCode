<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
const props = withDefaults(defineProps<{
  data?: any;
}>(), {

})

const componentContent = ref<string>(props.data?.label);
const componentType = ref<string>(props.data?.props?.type?.defaultValue);
const emits = defineEmits(['update:type']);
const closable = ref<string>(props.data?.props?.closable?.defaultValue);
const isLoading = ref<boolean | string>(props.data?.props?.loading?.defaultValue);
const motionBlur = ref<boolean>(props.data?.props?.motionBlur?.defaultValue);
const height = ref<string>(props.data?.props?.height?.defaultValue);
const direction = ref<string>(props.data?.props?.direction?.defaultValue);
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

function clearClosable() {
  closable.value = ''
}
function clearHeight() {
  height.value = ''
}

function clearDirect() {
  direction.value = ''
}

function clearLoading() {
  if (props.data?.props?.loading?.options) {
    isLoading.value = ''
  } else {
    isLoading.value = false
  }
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
    <!-- 可关闭 -->
    <el-form-item
        v-if="props.data?.props?.closable"
        label="是否可关闭"
    >
      <el-select
          v-model="closable"
          clearable
          @clear="clearClosable"
          placeholder="请选择是否可关闭"
      >
        <el-option
            v-for="(item, index) in props.data?.props?.closable.options"
            :key="index"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- 加载状态 -->
    <el-form-item
        v-if="!props.data?.props?.loading?.options"
        label="加载状态"
    >
      <el-switch
          v-model="isLoading"
      />
    </el-form-item>
    <el-form-item
        v-if="props.data?.props?.loading?.options"
        label="加载状态"
    >
      <el-select
          v-model="isLoading"
          placeholder="请选择加载方式"
          clearable
          @clear="clearLoading"
      >
        <el-option
            v-for="(item, index) in props.data?.props?.loading.options"
            :key="index"
            :value="item.value"
            :label="item.label"
        />
      </el-select>
    </el-form-item>
    <!-- 是否动态模糊 -->
    <el-form-item
        v-if="props.data?.props?.motionBlur"
        label="动态模糊"
    >
      <el-switch
          v-model="motionBlur"
      />
    </el-form-item>
    <!-- 组件高度 -->
    <el-form-item
        v-if="props.data?.props?.height"
        label="物料高度"
    >
      <el-input
          v-model="height"
          clearable
          placeholder="请输入物料高度"
          class="w-full"
          @clear="clearHeight"
      />
    </el-form-item>
    <!-- 物料方向 -->
    <el-form-item
        v-if="props.data?.props?.direction"
        label="方向"
    >
      <el-select
          v-model="direction"
          clearable
          placeholder="请选择方向"
          @clear="clearDirect"
      >
        <el-option
            v-for="(item, index) in props.data?.props?.direction.options"
            :key="index"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
  </div>
</template>

<style scoped>

</style>
