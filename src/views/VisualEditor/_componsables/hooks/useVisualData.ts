import initJson from '@/init.json'
import type {
    VisualEditorBlockTypes,
    VisualEditorModelValue, VisualEditorPage, VisualEditorSection
} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";


export const localKey = "PAGE_DATE_KEY"

/**
 * @description 创建空的新页面
 * @param title
 * @param path
 */
export function createNewPage(title: string, path: string) {
    return {
        title,
        path,
        config: {

        },
        section: []
    }
}

/**
 * @description 默认页面
 */
const defaultPage: VisualEditorModelValue = {
    pages: {
        '/': createNewPage('首页', '/')
    },
    modules: [], // 模型实体集合
    actions: {}
}

/**
 * @description 默认区块
 */
const defaultSection: VisualEditorSection = {
    index: 1,
    label: 'section1',
    isShow: false,
    component: [],
}

/**
 * @description 默认组件
 */
const defaultComponent: VisualEditorBlockTypes = {
    /** 组件id 时间戳, 组件唯一标识 */
    _vid: '2024-10-11',
    /** 组件所属的模块（基础组件、容器组件） */
    moduleName: 'basePackages',
    /** 映射 VisualEditorConfig 中 componentMap 的 component对象 */
    componentKey: 'card',
    /** 组件标签名称 */
    label: '卡片',
    /** 是否需要调整位置 */
    adjustPosition: true,
    /** 当前是否为选中状态 */
    focus: false,
    /** 当前组件的样式 */
    styles: {},
    /** 是否调整过宽度或者高度 */
    hasResize: false,
    /** 组件的设计属性 */
    props: {},
    /** 绑定的字段 */
    model: {},
    /** 组件是否可以被拖拽 */
    draggable: true,
    /** 是否显示组件样式配置项 */
    showStyleConfig: true,
    /** 动画集 */
    animations: [],
    /** 组件动作集合 */
    actions: [],
    /** 组件事件集合 */
    events: {}
}

/**
 * @description 创建新的页面段
 * @param index
 * @param label
 * @param isShow
 */
export function createNewSection(index: number, label: string, isShow: boolean) {
    return {
        index,
        label,
        isShow,
        components: [] // 组件集合
    }
}

/**
 * @description 创建新的组件
 * @param comp
 */
export function createNewComponent(comp: VisualEditorBlockTypes) {
    return {
        ...comp,
    }
}

interface INode {
    currentBlock: VisualEditorBlockTypes; // 当前正在操作的组件
    currentPage: VisualEditorPage; // 当前正在操作的页面
    jsonData: VisualEditorModelValue; // 整棵JSON树
}

export function initVisualData() {
    // 加载json树
    console.log(initJson);
    // 从本地存储中获取数据
    const localData = JSON.parse(sessionStorage.getItem(localKey) as string) || initJson;
    // 初始化数据
    // 初始化页面数据
    const jsonData: VisualEditorModelValue = Object.keys(localData?.pages || {})?.length ? localData : defaultPage;
    // 初始化section数据
    const sectionData: any[] = jsonData.pages?.['/']?.section || [];
    if (!sectionData.length) {
        sectionData.push(defaultSection)
        // 初始化默认组件
        if (!sectionData[0]?.component?.length) {
            sectionData[0]?.component?.push(defaultComponent)
        }
    }
    // 更新页面
    // 添加页面
    // 设置当前页面
    // 删除页面
}
