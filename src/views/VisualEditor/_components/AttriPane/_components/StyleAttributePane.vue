<script setup lang="ts">
import {reactive, ref} from 'vue';
withDefaults(defineProps<{
  data?: any;
}>(), {

})


const resourceWidth = ref<string>()
const resourceHeight = ref<string>()
interface blankTypes {
  left: string;
  right: string;
  top: string;
  bottom: string;
}
const margin = reactive<blankTypes>({
  left: '',
  right: '',
  top: '',
  bottom: ''
})
const padding = reactive<blankTypes>({
  left: '',
  right: '',
  top: '',
  bottom: ''
})

function clearHeight() {
  resourceHeight.value = ''
}

function clearWidth() {
  resourceWidth.value = ''
}
</script>

<template>
  <div class="w-full h-auto flex flex-col p-4 mt-4 bg-white">
    <!-- 布局 -->
    <el-collapse>
      <el-collapse-item title="布局" name="1">
        <template #default>
          <div class="w-full h-[250px] flex flex-col">
            <!-- 盒子编辑器 -->
            <div
                style="height: calc(100% - 40px)"
                class="w-full grid grid-cols-10 pt-4 grid-rows-6 gap-1"
            >
              <div class="w-full h-full col-span-1 row-span-1" />
              <!-- margin top -->
              <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-8 row-span-1">
                <el-form-item class="w-full h-6" label="top">
                  <el-input
                      v-model="margin.top"
                      style="height: 24px"
                  />
                </el-form-item>
              </div>
              <div class="w-full h-full col-span-1 row-span-1" />
              <!-- margin left -->
              <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-1 row-span-4">
                <el-input
                    v-model="margin.left"
                    style="width: 100%;height: 100%"
                />
              </div>
              <!-- inner box -->
              <div class="w-full h-full grid grid-cols-8 grid-rows-4 col-span-8 row-span-4">
                <div class="w-full h-full col-span-1 row-span-1" />
                <!-- padding top -->
                <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-6 row-span-1">
                  <el-form-item class="w-full h-6" label="top">
                    <el-input
                        v-model="padding.top"
                        style="height: 24px"
                    />
                  </el-form-item>
                </div>
                <div class="w-full h-full col-span-1 row-span-1" />
                <!-- padding left -->
                <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-1 row-span-2">
                  <el-input
                      v-model="padding.left"
                      style="width: 100%;height: 100%"
                  />
                </div>
                <!-- inner box -->
                <div class="w-full h-full flex col-span-6 row-span-2" />
                <!-- padding right -->
                <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-1 row-span-2">
                  <el-input
                      v-model="padding.right"
                      style="width: 100%;height: 100%"
                  />
                </div>
                <div class="w-full h-full col-span-1 row-span-1" />
                <!-- padding bottom -->
                <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-6 row-span-1">
                  <el-form-item class="w-full h-6" label="bottom">
                    <el-input
                        v-model="padding.bottom"
                        style="height: 24px"
                    />
                  </el-form-item>
                </div>
              </div>
              <!-- margin right -->
              <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-1 row-span-4">
                <el-input
                    v-model="margin.right"
                    style="width: 100%;height: 100%"
                />
              </div>
              <div class="w-full h-full col-span-1 row-span-1" />
              <!-- margin bottom -->
              <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-8 row-span-1">
                <el-form-item class="w-full h-6" label="bottom">
                  <el-input
                      v-model="margin.bottom"
                      style="height: 24px"
                  />
                </el-form-item>
              </div>
            </div>
            <!-- 长宽编辑器 -->
            <div class="w-full h-10 flex items-center">
              <el-form>
                <div class="w-full h-full flex">
                  <el-form-item label="宽度">
                    <el-input
                        v-model="resourceWidth"
                        clearable
                        @clear="clearWidth"
                        placeholder="请输入宽度"
                        style="width: 100px"
                    >
                      <template #suffix>
                        px
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="高度">
                    <el-input
                        v-model="resourceHeight"
                        clearable
                        @clear="clearHeight"
                        placeholder="请输入高度"
                        style="width: 100px"
                    >
                      <template #suffix>
                        px
                      </template>
                    </el-input>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped>
:deep(.el-form-item) {
  margin-right: 0 !important;
  margin-bottom: 0 !important;
}

:deep(.el-collapse-item__header) {
  &.is-active {
    background: #EBECF0;
  }
}

:deep(.el-form-item) {
  margin: 0 !important;
}

:deep(.el-form-item__label) {
  height: 24px;
  display: flex;
  align-items: center;
}

:deep(.el-input) {
  outline: none !important;
  border: none !important;
}
</style>
