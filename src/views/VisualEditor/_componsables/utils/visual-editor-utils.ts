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
 * @description 单个组件注册规则
 */
export type VisualEditorComponent = {
    /** 组件name */
    key: string;
    /** 组件所属模块名称 */
    moduleName: keyof ComponentModules;
    /** 组件唯一id */
    _vid?: string;
    /** 组件中文名称 */
    label: string;
    /** 组件预览函数 */
    preview: () => JSX.Element;
    /** 组件渲染函数 */
    render: (data: {
        props: any;
        model: any;
        styles: CSSProperties;
        block: VisualEditorBlockData;
        custom: Record<string, any>;
    }) => () => JSX.Element;
    /** 组件是否可以被拖拽 */
    draggable?: boolean;
    /** 是否显示组件的样式配置项 */
    showStyleConfig?: boolean;
    /** 组件属性 */
    props?: Record<string, VisualEditorProps>;
    /** 动画集 */
    animations?: Animation[];
    /** 组件事件集合 */
    events?: { label: string; value: string }[];
    /** 组件样式 */
    styles?: CSSProperties;
};



/**
 * @description 动画项
 */
export type Animation = {
    /** 动画名称 */
    label: string;
    /** 动画类名 */
    value: string;
    /** 动画持续时间 */
    duration: number;
    /** 动画延迟多久执行 */
    delay: number;
    /** 动画执行次数 */
    count: number;
    /** 是否无限循环动画 */
    infinite: boolean;
};


/**
 * @description 组件动作事件处理
 */
export type ActionHandle = {
    key: string;
    name: string;
    link: string[];
    data?: {
        bind?: string;
        recv?: string;
    };
};
/**
 * @description 组件动作
 */
export type Action = {
    key: string;
    name: string;
    event: string;
    handle: ActionHandle[];
};

/**
 * @description 组件配置中心
 */
export function createVisualEditorConfig() {
    const componentMap: Record<string, VisualEditorComponent> = {}; // 组件映射表
    const componentModules: ComponentModules = {
        baseComponents: [],
        blockComponents: [],
        businessComponents: [],
        chartComponents: [],
        formComponents: [],
        layoutComponents: [],
    };
    return {
        componentModules, // 组件模块
        componentMap,
        registry: <
            _,
            Props extends Record<string, VisualEditorProps> = {},
            Model extends Record<string, string> = {},
        >(
            moduleName: keyof ComponentModules,
            key: string,
            component: {
                label: string;
                preview: () => JSX.Element;
                render: (data: {
                    props: { [k in keyof Props]: any };
                    model: Partial<{ [k in keyof Model]: any }>;
                    styles: CSSProperties;
                    block: VisualEditorBlockData;
                    custom: Record<string, any>;
                }) => () => JSX.Element;
                props?: Props;
                model?: Model;
                styles?: CSSProperties;
            },
        ) => {
            const comp = { ...component, key, moduleName };
            componentModules[moduleName].push(comp);
            componentMap[key] = comp;
        },
    };
}


/**
 * @description 组件模块定义
 */
export type ComponentModules = {
    baseComponents: VisualEditorComponent[]; // 基础组件
    blockComponents: VisualEditorComponent[]; // 区块组件
    businessComponents: VisualEditorComponent[]; // 业务组件
    chartComponents: VisualEditorComponent[]; // 图表组件
    layoutComponents: VisualEditorComponent[]; // 布局组件
    formComponents: VisualEditorComponent[]; // 表单组件
}



export function createNewBlock(component: VisualEditorComponent): VisualEditorBlockData {
    return {
        _vid: `vid_${generateNanoid()}`,
        moduleName: component.moduleName,
        componentKey: component!.key,
        label: component!.label,
        adjustPosition: true,
        focus: false,
        styles: {
            display: 'flex',
            justifyContent: 'flex-start',
            paddingTop: '0',
            paddingRight: '0',
            paddingLeft: '0',
            paddingBottom: '0',
            tempPadding: '0',
        },
        hasResize: false,
        props: Object.entries(component.props || {}).reduce((prev, [propName, propSchema]) => {
            const { propObj, prop } = useDotProp(prev, propName);
            if (propSchema?.defaultValue) {
                propObj[prop] = prev[propName] = propSchema?.defaultValue;
            }
            return prev;
        }, {}),
        draggable: component.draggable ?? true, // 是否可以拖拽
        showStyleConfig: component.showStyleConfig ?? true, // 是否显示组件样式配置
        animations: [], // 动画集
        actions: [], // 动作集合
        events: component.events || [], // 事件集合
        model: {},
    };
}
