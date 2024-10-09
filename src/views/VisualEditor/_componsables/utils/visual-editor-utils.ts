import type {CSSProperties} from "vue";

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
