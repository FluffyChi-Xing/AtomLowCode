import {createVisualEditorConfig} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import baseComponents from "@/packages/basePackages";
import layoutComponents from '@/packages/layoutPackages'

export const visualConfig = createVisualEditorConfig();
// 注册基础组件
Object.entries(baseComponents).forEach(([key, component]) => {
    visualConfig.registry('baseComponents', key, component)
})

// 注册布局组件

Object.entries(layoutComponents).forEach(([key, component]) => {
    visualConfig.registry('layoutComponents', key, component)
})
