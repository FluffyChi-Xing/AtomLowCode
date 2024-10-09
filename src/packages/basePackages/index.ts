import type {
    VisualEditorComponent
} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";

const modules = import.meta.glob('./*/index.tsx', { eager: true }) // 获取所有的组件
console.log(modules)

const components: Record<string, VisualEditorComponent> = {}; // 组件集合

/**
 * 遍历所有的组件，将组件的名称作为 key，组件对象作为 value 存储到 components 中
 */
Object.entries(modules).forEach(([key, module]) => {
    const compName = key.replace(/\.\/(.*)\/index\.(tsx|vue)/, '$1');
    components[compName] = module?.default || module;
})

console.log('basePackages', components)

export default components;
