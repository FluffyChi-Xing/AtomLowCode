<script setup lang="ts">
import {ref, watch} from 'vue';
import type {VisualEditorTypes} from "@/views/VisualEditor/_componsables/api/visualEditorTypes";
import {Cellphone, Iphone, Monitor, RefreshLeft, RefreshRight} from "@element-plus/icons-vue";



const emits = defineEmits(['sizeChange'])
/** ====== 画布尺寸调整-start ===== */
const reactSize = ref<string>('pc');
const sizeNumber = ref<number>(device2px(reactSize.value));
const radioOptions = ref<VisualEditorTypes.canvasSizeTypes[]>([
  {
    icon: Monitor,
    label: '电脑',
    value: 'pc'
  },
  {
    icon: Cellphone,
    label: '平板',
    value: 'pad'
  },
  {
    icon: Iphone,
    label: '手机',
    value: 'phone'
  }
])
function device2px(item: string) {
  switch (item) {
    case 'pc':
      return 1100;
    case 'pad':
      return 768;
    case 'phone':
      return 375;
  }
}

function handleSizeChange() {
  emits('sizeChange', sizeNumber.value)
}
watch(() => reactSize.value, (val) => {
  sizeNumber.value = device2px(val);
})
/** ====== 画布尺寸调整-end ===== */
</script>

<template>
  <div class="w-full h-full grid grid-cols-3 z-[3999] gap-4 px-5 bg-white">
    <div class="w-full h-full flex items-center">
      <!-- title -->
      <span class="text-[20px] font-bold">低代码引擎</span>
    </div>
    <div class="w-full h-full flex items-center justify-center">
      <!-- 画布尺寸调整 -->
      <el-form-item>
        <div class="w-full h-full flex">
          <!-- 单选框 -->
          <el-radio-group
              v-model="reactSize"
              @change="handleSizeChange"
          >
            <el-tooltip
                v-for="(item, index) in radioOptions"
                effect="dark"
                placement="bottom"
                :key="index"
                :content="item.label"
            >
              <el-radio-button
                  :value="item.value"
              >
                <el-icon>
                  <component :is="item.icon" />
                </el-icon>
              </el-radio-button>
            </el-tooltip>
          </el-radio-group>
          <!-- input number -->
          <el-input-number
              v-model="sizeNumber"
              style="width: 200px;"
              placeholder="请输入画布宽度"
              :min="375"
              class="ml-4"
              @keydown.enter="handleSizeChange"
          >
            <template #suffix>
              <span class="text-gray-500">px</span>
            </template>
          </el-input-number>
        </div>
      </el-form-item>
    </div>
    <div class="w-full h-full flex items-center">
      <!-- 动作撤销 -->
      <div class="w-auto h-full flex items-center mr-2">
        <el-tooltip
            effect="dark"
            content="撤销"
            placement="bottom"
        >
          <el-button class="mr-1">
            <el-icon><RefreshLeft /></el-icon>
          </el-button>
        </el-tooltip>
        <el-tooltip
            effect="dark"
            content="恢复"
            placement="bottom"
        >
          <el-button>
            <el-icon><RefreshRight /></el-icon>
          </el-button>
        </el-tooltip>
      </div>
      <!-- 异步资源加载 -->
      <el-button>异步加载资源</el-button>
      <!-- 保存到本地 -->
      <el-button type="primary">保存</el-button>
      <!-- 页面重置 -->
      <el-button>重置页面</el-button>
      <!-- 页面预览 -->
      <el-button class="theme-btn">预览</el-button>
    </div>
  </div>
</template>

<style scoped>
@import "@/assets/css/Element-Plus.scss";
:deep(.el-form-item) {
  margin: 0;
}
</style>
