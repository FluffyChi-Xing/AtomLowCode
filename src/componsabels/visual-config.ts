import {createVisualEditorConfig} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import components from "@/packages/basePackages";

export const visualConfig = createVisualEditorConfig();
// 注册基础组件
Object.entries(components).forEach(([key, component]) => {
    visualConfig.registry('baseComponents', key, component)
})
