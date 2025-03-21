<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {updateComponent} from "@/views/VisualEditor/_componsables/hooks/useVisualData";
import {$message} from "@/componsabels/Element-Plus";
const props = withDefaults(defineProps<{
  data?: any;
  label?: string;
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
// 菜单等物料相关属性
const defaultActive = ref<string>(props.data?.props?.defaultActive?.defaultValue);
const activeTextColor = ref<string>(props.data?.props?.activeTextColor?.defaultValue);
const backgroundColor = ref<string>(props.data?.props?.backgroundColor?.defaultValue);
const textColor = ref<string>(props.data?.props?.textColor?.defaultValue);
const mode = ref<string>(props.data?.props?.mode?.defaultValue);
const modes = ref<any[]>(props.data?.props?.mode?.options || []);
const image = ref<string>(props?.data?.props?.image?.defaultValue);
const content = ref<string>(props.data.props?.content?.defaultValue);
const animated = ref<boolean | string>(props.data?.props?.animated?.defaultValue);
const background = ref<boolean>(props.data?.props?.background?.defaultValue);
// 其他通用属性
const size = ref<string>(props.data?.props?.size?.defaultValue);
const description = ref<string>(props.data?.props?.description?.defaultValue);
const fit = ref<string>(props.data?.props?.fit?.defaultValue);
const alt = ref<string>(props.data?.props?.alt?.defaultValue);
const underline = ref<boolean>(props.data?.props?.underline?.defaultValue);
function clearContent() {
  componentContent.value = ''
}

function initData() {
  componentContent.value = props.data?.label
  componentType.value = props.data?.props?.type?.defaultValue
  closable.value = props.data?.props?.closable?.defaultValue
  isLoading.value = props.data?.props?.loading?.defaultValue
  motionBlur.value = props.data?.props?.motionBlur?.defaultValue
  height.value = props.data?.props?.height?.defaultValue
  direction.value = props.data?.props?.direction?.defaultValue
  defaultActive.value = props.data?.props?.defaultActive?.defaultValue
  activeTextColor.value = props.data?.props?.activeTextColor?.defaultValue
  backgroundColor.value = props.data?.props?.backgroundColor?.defaultValue
  textColor.value = props.data?.props?.textColor?.defaultValue
  mode.value = props.data?.props?.mode?.defaultValue
  image.value = props?.data?.props?.image?.defaultValue
  content.value = props.data.props?.content?.defaultValue
  animated.value = props.data?.props?.animated?.defaultValue
  background.value = props.data?.props?.background?.defaultValue
  size.value = props.data?.props?.size?.defaultValue
  description.value = props.data?.props?.description?.defaultValue
  fit.value = props.data?.props?.fit?.defaultValue
  alt.value = props.data?.props?.alt?.defaultValue
  underline.value = props.data?.props?.underline?.defaultValue
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

function clearDefaultAct() {
  defaultActive.value = ''
}

function sizeClear() {
  size.value = ''
}

function clearFit() {
  fit.value = ''
}

function clearAlt() {
  alt.value = ''
}

function clearLoading() {
  if (props.data?.props?.loading?.options) {
    isLoading.value = ''
  } else {
    isLoading.value = false
  }
}

function clearImage() {
  image.value = ''
}

function contentClear() {
  content.value = ''
}

function clearDesc() {
  description.value = ''
}

function handleConfirm() {
  const data = {
    componentContents: componentContent.value,
    type: componentType.value,
    closable: closable.value,
    loading: isLoading.value,
    motionBlur: motionBlur.value,
    height: height.value,
    direction: direction.value,
    defaultActive: defaultActive.value,
    activeTextColor: activeTextColor.value,
    backgroundColor: backgroundColor.value,
    textColor: textColor.value,
    mode: mode.value,
    image: image.value,
    content: content.value,
    animated: animated.value,
    background: background.value,
    size: size.value,
    description: description.value,
    fit: fit.value,
    alt: alt.value,
    underline: underline.value
  }
  console.log('prop label:', props.label)
  try {
    updateComponent(props.label, props.data?.label, data);
    $message({
      type: 'success',
      message: '更新成功',
      offset: 80
    })
  } catch (e) {
    $message({
      type: 'danger',
      message: '更新失败',
      offset: 80
    })
  }
}

function clearMode() {
  mode.value = ''
}

watch(() => componentType.value, () => {
  changeType()
})

onMounted(() => {
  console.log('data:', props.data)
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
          disabled
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
    <!-- 是否下划线 -->
    <el-form-item
        v-if="props.data?.props?.underline"
        label="是否下划线"
    >
      <el-switch
          v-model="underline"
      />
    </el-form-item>
    <!-- 加载状态 -->
    <el-form-item
        v-if="props.data?.props?.loading"
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
    <!-- 默认高亮项 -->
    <el-form-item
        v-if="defaultActive"
        label="默认高亮"
    >
      <el-input
          v-model="defaultActive"
          clearable
          class="w-full"
          @clear="clearDefaultAct"
      />
    </el-form-item>
    <!-- 高亮文字颜色 -->
    <el-form-item
        v-if="activeTextColor"
        label="高亮文字颜色"
    >
      <el-color-picker
          v-model="activeTextColor"
          show-alpha
      />
    </el-form-item>
    <!-- 背景颜色 -->
    <el-form-item
        v-if="backgroundColor"
        label="背景颜色"
    >
      <el-color-picker
          v-model="backgroundColor"
          show-alpha
      />
    </el-form-item>
    <!-- 文字颜色 -->
    <el-form-item
        v-if="textColor"
        label="文字颜色"
    >
      <el-color-picker
          v-model="textColor"
          show-alpha
      />
    </el-form-item>
    <!-- 图片提示 -->
    <el-form-item
        v-if="props.data?.props?.alt"
        label="图片提示"
    >
      <el-input
          v-model="alt"
          clearable
          placeholder="请输入图片提示"
          @clear="clearAlt"
          class="w-full"
      />
    </el-form-item>
    <!-- 对齐方式 -->
    <el-form-item
        v-if="mode"
        label="对齐方式"
    >
      <el-select
          v-model="mode"
          clearable
          @clear="clearMode"
          placeholder="请选择对齐方式"
      >
        <el-option
            v-for="(item, index) in modes"
            :key="index"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- 图片组件图源配置 -->
    <el-form-item
        v-if="props.data?.props?.image"
        label="图源配置"
    >
      <el-input
          v-model="image"
          clearable
          placeholder="请输入图源"
          class="w-full"
          @clear="clearImage"
      />
    </el-form-item>
    <!-- 内容填充 -->
    <el-form-item
        v-if="props.data?.props?.content"
        label="内容填充"
    >
      <el-input
          v-model="content"
          clearable
          placeholder="请输入内容"
          @clear="contentClear"
          class="w-full"
      />
    </el-form-item>
    <!-- 是否开启动画 -->
    <el-form-item
        v-if="props.data?.props?.animated"
        label="是否开启动画"
    >
      <el-switch
          v-model="animated"
      />
    </el-form-item>
    <!-- 是否开启背景 -->
    <el-form-item
        v-if="props.data?.props?.background"
        label="是否开启背景"
    >
      <el-switch
          v-model="background"
      />
    </el-form-item>
    <!-- 尺寸选择 -->
    <el-form-item
        v-if="props.data?.props?.size"
        label="尺寸选择"
    >
      <el-select
          v-model="size"
          clearable
          @clear="sizeClear"
          placeholder="请选择尺寸"
          placement="bottom"
      >
        <el-option
            v-for="(item, index) in props.data.props?.size?.options"
            :key="index"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- 描述内容 -->
    <el-form-item
        v-if="props.data?.props?.description"
        label="描述内容"
    >
      <el-input
          v-model="description"
          clearable
          @clear="clearDesc"
          placeholder="请输入描述内容"
          class="w-full"
      />
    </el-form-item>
    <!-- 填充方式 -->
    <el-form-item
        v-if="props.data?.props?.fit"
        label="填充方式"
    >
      <el-select
          v-model="fit"
          clearable
          @clear="clearFit"
          placeholder="请选择填充方式"
          placement="bottom"
      >
        <el-option
            v-for="(item, index) in props.data?.props?.fit?.options"
            :key="index"
            :label="item.label"
            :value="item.value"
        />
      </el-select>
    </el-form-item>
    <!-- 是否修改 -->
    <el-form-item
        label="是否修改"
    >
      <div class="w-full h-auto flex justify-end items-center">
        <el-button @click="handleConfirm" class="theme-btn">确认</el-button>
      </div>
    </el-form-item>
  </div>
</template>

<style scoped>
@import "@/assets/css/Element-Plus.scss";
</style>
