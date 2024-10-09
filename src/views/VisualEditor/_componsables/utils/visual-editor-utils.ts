import type {CSSProperties} from "vue";


/**
 * @description 组件属性
 */
export type VisualEditorBlockTypes = {
    /** 组件id 时间戳, 组件唯一标识 */
    _vid: string;
    /** 组件所属的模块（基础组件、容器组件） */
    moduleName: keyof ComponentModules;
    /** 映射 VisualEditorConfig 中 componentMap 的 component对象 */
    componentKey: string;
    /** 组件标签名称 */
    label: string;
    /** 是否需要调整位置 */
    adjustPosition: boolean;
    /** 当前是否为选中状态 */
    focus: boolean;
    /** 当前组件的样式 */
    styles: CSSProperties & {
        tempPadding?: string;
    };
    /** 是否调整过宽度或者高度 */
    hasResize: boolean;
    /** 组件的设计属性 */
    props: Record<string, any>;
    /** 绑定的字段 */
    model: Record<string, string>;
    /** 组件是否可以被拖拽 */
    draggable: boolean;
    /** 是否显示组件样式配置项 */
    showStyleConfig?: boolean;
    /** 动画集 */
    animations?: Animation[];
    /** 组件动作集合 */
    actions: Action[];
    /** 组件事件集合 */
    events: { label: string; value: string }[];
    [prop: string]: any;
}


/**
 * @description 组件配置中心
 */
export function createVisualEditorConfig() {
    const componentMap: Record<string, VisualEditorBlockTypes> = {}; // 组件映射表
    const componentModules: ComponentModules = {
        baseComponents: [],
        blockComponents: [],
        businessComponent: [],
        chartComponents: [],
        formComponents: [],
        layoutComponents: [],
    }
    return {
        componentModules,
        componentMap,
        registry: <
            _, // 组件属性
            Props extends Record<string, VisualEditorBlockTypes> = {}, // 属性
            Model extends Record<string, string> = {}, // 模块
            >(
                moduleName: keyof ComponentModules, // 模块名称
                key: string, // 组件key
                component: {
                    label: string; // 组件名称
                    preview: () => JSX.Element; // 组件预览
                    render: (data: {
                        props: { [k in keyof  Props]: any }; // 属性
                        model: Partial<{ [k in keyof Model]: any }>; // 模块
                        styles: CSSProperties; // 样式
                        block: VisualEditorBlockTypes; // 组件
                        custom: Record<string, any>; // 自定义
                    }) => JSX.Element; // 组件渲染
                    props?: Props; // 属性
                    model?: Model; // 模块
                    styles?: CSSProperties; // 样式
                }
        ) => {
            const comp = { ...component, key, moduleName };
            componentModules[moduleName].push(comp);
            componentMap[key] = comp;
        }
    }
}


/**
 * @description 组件模块定义
 */
export type ComponentModules = {
    baseComponents: VisualEditorBlockTypes[]; // 基础组件
    blockComponents: VisualEditorBlockTypes[]; // 区块组件
    businessComponents: VisualEditorBlockTypes[]; // 业务组件
    chartComponents: VisualEditorBlockTypes[]; // 图表组件
    layoutComponents: VisualEditorBlockTypes[]; // 布局组件
    formComponents: VisualEditorBlockTypes[]; // 表单组件
}
