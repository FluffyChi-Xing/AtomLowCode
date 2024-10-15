<script setup lang="ts">
import { ref } from 'vue';
withDefaults(defineProps<{
  data?: any;
}>(), {

})


const resourceWidth = ref<string>()
const resourceHeight = ref<string>()

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
          <div class="w-full h-[216px] flex flex-col">
            <!-- 盒子编辑器 -->
            <div
                style="height: calc(100% - 40px)"
                class="w-full grid grid-cols-10 pt-4 grid-rows-6 gap-1"
            >
              <div class="w-full h-full col-span-1 row-span-1" />
              <!-- margin top -->
              <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-8 row-span-1">

              </div>
              <div class="w-full h-full col-span-1 row-span-1" />
              <!-- margin left -->
              <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-1 row-span-4">

              </div>
              <!-- inner box -->
              <div class="w-full h-full grid grid-cols-8 grid-rows-4 col-span-8 row-span-4">
                <div class="w-full h-full col-span-1 row-span-1" />
                <!-- padding top -->
                <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-6 row-span-1">

                </div>
                <div class="w-full h-full col-span-1 row-span-1" />
                <!-- padding left -->
                <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-1 row-span-2">

                </div>
                <!-- inner box -->
                <div class="w-full h-full flex col-span-6 row-span-2" />
                <!-- padding right -->
                <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-1 row-span-2">

                </div>
                <div class="w-full h-full col-span-1 row-span-1" />
                <!-- padding bottom -->
                <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-6 row-span-1">

                </div>
              </div>
              <!-- margin left -->
              <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-1 row-span-4">

              </div>
              <div class="w-full h-full col-span-1 row-span-1" />
              <!-- margin bottom -->
              <div class="w-full h-full flex items-center bg-[#D6E4FF] col-span-8 row-span-1">

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
</style>
