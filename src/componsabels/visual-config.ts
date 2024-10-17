import {createVisualEditorConfig} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import baseComponents from "@/packages/basePackages";
import layoutComponents from '@/packages/layoutPackages'
import formComponents from '@/packages/formPackages'
import chartPackages from "@/packages/chartPackages";
import blockPackages from "@/packages/blockPackages";
import businessPackages from "@/packages/businessPackages";

export const visualConfig = createVisualEditorConfig();
// 注册基础组件
Object.entries(baseComponents).forEach(([key, component]) => {
    visualConfig.registry('baseComponents', key, component)
})

// 注册布局组件

Object.entries(layoutComponents).forEach(([key, component]) => {
    visualConfig.registry('layoutComponents', key, component)
})

// 注册表单组件

Object.entries(formComponents).forEach(([key, component]) => {
    visualConfig.registry('formComponents', key, component)
})


// 注册图表组件

Object.entries(chartPackages).forEach(([key, component]) => {
    visualConfig.registry('chartComponents', key, component)
})


// 注册块状组件
Object.entries(blockPackages).forEach(([key, component]) => {
    visualConfig.registry('blockComponents', key, component)
})

// 注册业务组件

Object.entries(businessPackages).forEach(([key, component]) => {
    visualConfig.registry('businessComponents', key, component)
})
