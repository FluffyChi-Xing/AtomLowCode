import initJson from '@/init.json'
import type {
    VisualEditorBlockTypes,
    VisualEditorModelValue, VisualEditorPage, VisualEditorSection
} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {SectionTypes} from "@/views/VisualEditor/_componsables/api/sectionTypes";
import {$message} from "@/componsabels/Element-Plus";
import * as path from "path";


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


function deepClone(item: any) {
    return JSON.parse(JSON.stringify(item))
}

function checkSession() {
    try {
        JSON.parse(JSON.stringify(localKey));
    } catch (e) {
        sessionStorage.clear(localKey)
        console.log('session storage 错误',e)
    }
}

/**
 * @description 创建区块执行函数
 * @param localData
 * @param section
 */
function createSection(localData: any, section: any) {
    // 创建 localData 的深拷贝
    const newData = deepClone(localData);
    // 向 newData.page[0].section 添加新的 section
    newData.page[0].section?.push(section);
    // 保存数据到操作栈
    saveProgress(section);
    console.log('sessionStorage', newData);
    // 返回 newData
    return newData;
}


/**
 * @description 设置sessionStorage
 * @param key
 * @param value
 */
function setSessionStorage(key: any, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value))
}

/**
 * @description 插入区块
 * @param section
 */
export function insertSection(section?: SectionTypes.pageSection) {
    checkSession()
    let localData = JSON.parse(sessionStorage.getItem(localKey) as string);
    if (localData) {
        if (section) {
            const newData = createSection(localData, section);
            // 更新sessionStorage
            setSessionStorage(localKey, newData);
        }
    } else {
        localData = JSON.parse(JSON.stringify(initJson));
        if (section) {
            const newData = createSection(localData, section);
            // 创建sessionStorage
            setSessionStorage(localKey, newData);
            console.log('不存在sessionStorage',localData);
        }
    }
}

/**
 * @description 删除区块执行函数
 * @param localData
 * @param section
 */
function spliceSection(localData: any, section: string) {
    const newData = deepClone(localData);
    const index = newData.page[0].section?.findIndex((item: any) => item?.label === section);
    if (index !== undefined && index !== -1) {
        newData.page[0].section?.splice(index, 1);
        console.log('sessionStorage 删除区块', newData);
    }
    return newData;
}

/**
 * @description 删除区块
 * @param section
 */
export function deleteSection(section: any) {
    checkSession()
    let localData = JSON.parse(sessionStorage.getItem(localKey) as string);
    if (localData) {
        if (section) {
            const newData = spliceSection(localData, section);
            setSessionStorage(localKey, newData);
        }
    } else {
        localData = JSON.parse(JSON.stringify(initJson));
        if (section) {
            const newData = spliceSection(localData, section);
            setSessionStorage(localKey, newData);
        }
    }
}


function getHomePage(localData: any) {
    try {
        const pageList = localData?.page;
        return pageList?.find(item => item?.config?.home === true);
    } catch (e) {
        console.log(e)
    }
}


/**
 * @description 创建组件执行函数
 * @param localData
 * @param comp
 */
function handleCreateComp(localData: any, comp: any) {
    if (comp !== null && comp !== undefined) {
        // 深拷贝 localData
        const newData = deepClone(localData);
        // 获取主页面
        const currentPage = getHomePage(newData);
        // 获取当前的 section list
        const currentSection = currentPage.section.find((item: any) => item?.label === comp?.sectionLabel);
        try {
            // 保存到操作栈
            saveProgress(comp?.comp);
            currentSection.component?.push(comp?.comp);
        } catch (e) {
            console.log('插入组件错误', e);
            $message({
                type: "error",
                message: '未知错误',
                offset: 80
            });
        }
        console.log('sessionStorage 插入组件', newData);
        return newData;
    }
}


/**
 * @description 插入组件
 * @param comp
 */
export function insertComponent(comp: SectionTypes.createComp) {
    checkSession()
    const localData = JSON.parse(sessionStorage.getItem(localKey) as string);
    if (localData) {
        const newData = handleCreateComp(localData, comp);
        setSessionStorage(localKey, newData); // 更新sessionStorage
    } else {
        const localData = JSON.parse(JSON.stringify(initJson));
        const newData = handleCreateComp(localData, comp);
        setSessionStorage(localKey, newData); // 创建sessionStorage
    }
}


/**
 * @description 删除组件执行函数
 * @param localData
 * @param comp
 * @param index
 * @param label
 */
function handleDeleteComp(localData: any, comp: any, index: number, label: string) {
    if (comp) {
        const pageList = localData.page;
        const currentPage = pageList.find(item => item?.config?.home === true);
        const currentSection = currentPage.section.find((item: any) => item?.label === label);
        let currentComp = [];
        currentComp = currentSection?.component;
        if (index !== -1) { // 检查index是否不等于-1
            currentComp?.splice(index, 1);
            console.log('sessionStorage 删除组件', currentComp);
        } else {
            console.log('未找到要删除的组件');
        }
        return localData;
    }
}

export function removeComponent(comp: any, index: number, label: string) {
    checkSession()
    const localData = JSON.parse(sessionStorage.getItem(localKey) as string);
    if (localData) {
        const newData = handleDeleteComp(localData, comp, index, label);
        setSessionStorage(localKey, newData)
    } else {
        const localData = JSON.parse(JSON.stringify(initJson));
        const newData = handleDeleteComp(localData, comp, index, label);
        setSessionStorage(localKey, newData)
    }
}


/**
 * @description 获取 sessionStorage
 */
export function getSessionCode() {
    return JSON.parse(sessionStorage.getItem(localKey) as string || JSON.stringify(initJson));
}


/**
 * @description 更新组件参数适配器
 * @param item
 * @param params
 */
function compUpdateAdaptor(item: any, params: any) {
    const props = item?.props;
    if (props && params) {
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key) && Object.prototype.hasOwnProperty.call(props, key)) {
                props[key].defaultValue = params[key];
                console.log('更新组件参数', props[key]);
            }
        }
    }
}

/**
 * @description 更新组件参数执行函数
 * @param localData
 * @param section
 * @param uuid
 * @param params
 */
function handleUpdateComp(localData: any, section: string, uuid: any, params: any) {
    if (uuid && params) {
        const newData = deepClone(localData);
        const currentSection = newData.page[0].section.find((item: any) => item?.label === section);
        const currentComp = currentSection?.component?.find((item: any) => item?.label === uuid);
        // params 处理函数
        compUpdateAdaptor(currentComp, params);
        return newData;
    }
}


/**
 * @description 更新组件参数
 * @param section
 * @param uuid
 * @param params
 */
export function updateComponent(section: string, uuid: any, params: any) {
    const localData = JSON.parse(sessionStorage.getItem(localKey) as string);
    if (localData) {
        // 有 sessionStorage 逻辑
        const newData = handleUpdateComp(localData, section, uuid, params);
        setSessionStorage(localKey, newData);
    } else {
        // 无 sessionStorage 逻辑
        const localData = JSON.parse(JSON.stringify(initJson));
        const newData = handleUpdateComp(localData, section, uuid, params);
        setSessionStorage(localKey, newData);
    }
}


/**
 * @description 获取持久化的区块列表
 */
export function persistentSectionList() {
    const sessionData = JSON.parse(sessionStorage.getItem(localKey) as string);
    if (sessionData) {
        // 确定主页面位置
        const pageList = sessionData?.page;
        return pageList.find(item => item?.config?.home === true)?.section;
    }
}


/** ========== 操作进度栈-start ========== */


/**
 * @description 操作栈
 */
class progressStack {
    private items: any[] = [];
    // 入栈
    push(item: any) {
        this.items.push(item);
    }
    // 出栈
    pop(): any {
        return this.items.pop();
    }
    // 是否栈空
    isEmpty() {
        return this.items.length === 0;
    }
    // 容量
    size() {
        return this.items.length;
    }
    // 清空栈
    clear() {
        this.items = [];
    }
    // 获取栈顶元素
    getTop() {
        return this.items[this.items.length - 1];
    }
}


/**
 * @description 进度栈
 */
export const proStack = new progressStack(); // 进度栈

export const stagingStack = new progressStack(); // 暂存栈
/**
 * @description 保存进度
 * @param item
 */
export function saveProgress(item: any) {
    proStack.push(item);
    console.log('保存进度到进度栈');
}

/**
 * @description 撤销进度
 */
export function removeProgress() {
    // 存入暂存栈
    stagingStack.push(proStack.getTop());
    proStack.pop(); // 出栈
    console.log('撤销进度，存入暂存栈', proStack);
}


/**
 * @description 恢复进度
 */
export function redoProcess() {
    // 存入进度栈
    proStack.push(stagingStack.getTop());
    // 暂存栈出栈
    stagingStack.pop();
    console.log('恢复进度，存入进度栈', proStack);
}


/** ========== 操作进度栈-end ========== */


/**
 * @description 页面大小同步执行函数
 * @param localData
 * @param params
 */
function handleChangeSize(localData: any, params: any) {
    const newData = deepClone(localData);
    const pageList = newData?.page;
    const pageSize = pageList.find(item => item?.config?.home === true)?.size;
    if (pageSize) {
        pageSize.width = params.width;
        pageSize.height = params.height;
    } else if (pageList[0]?.size) {
        pageList[0].size.width = 1100;
        pageList[0].size.height = 'auto';
    }
    return newData;
}

/**
 * @description 同步页面大小
 * @param params
 */
export function syncSize(params: any) {
    const localData = JSON.parse(sessionStorage.getItem(localKey) as string);
    // 如果sessionStorage中有数据
    try {
        if (localData) {
            const newData = handleChangeSize(localData, params);
            setSessionStorage(localKey, newData);
        } else {
            // 如果sessionStorage中没有数据
            const localData = JSON.parse(JSON.stringify(initJson));
            const newData = handleChangeSize(localData, params);
            setSessionStorage(localKey, newData);
        }
    } catch (e) {
        $message({
            type: "error",
            message: '同步页面大小错误',
            offset: 80
        })
    }
}


/**
 * @description 获取session storage 存储的页面数据
 */
export function getLocalData() {
    const localData = JSON.parse(sessionStorage.getItem(localKey) as string);
    if (localData) {
        return localData
    } else {
        const data = JSON.parse(JSON.stringify(initJson))
        if (data) {
            return data;
        } else {
            return null;
        }
    }
}


/**
 * @description 插入新页面执行函数
 * @param localData
 * @param name
 * @param path
 */
function handleNewPage(localData: any, name: string, path: string) {
    if (name && path) {
        try {
            const newData = deepClone(localData);
            const pageList = newData?.page;
            pageList.push({
                title: name,
                path: path,
                config: {
                    home: false
                },
                size: {
                    width: 1100,
                    height: 'auto'
                },
                section: [
                    {
                        index: 1,
                        label: 'section1',
                        isShow: false,
                        component: []
                    }
                ],
                module: [],
                action: {}
            })
            return newData;
        } catch (e) {
            $message({
                type: "warning",
                message: '页面创建错误',
                offset: 80
            })
            console.log(e)
        }
    }
}


/**
 * @description 插入新页面
 * @param name 页面名称
 * @param path 页面路径
 */
export function insertNewPage(name: string, path: string) {
    const localData = JSON.parse(sessionStorage.getItem(localKey) as string);
    // 如果存在 session storage
    if (localData) {
        const newData = handleNewPage(localData, name, path);
        setSessionStorage(localKey, newData);
        $message({
            type: "success",
            message: '创建成功',
            offset: 80
        })
    } else {
        // 如=如果不存在 session storage
        const data = JSON.parse(JSON.stringify(initJson));
        const newData = handleNewPage(data, name, path);
        setSessionStorage(localKey, newData);
        $message({
            type: "success",
            message: '创建成功',
            offset: 80
        })
    }
}


/**
 * @description 切换主页执行函数
 * @param localData
 * @param path
 */
function handleChangeHome(localData: any, path: any) {
    const newData = deepClone(localData);
    if (path) {
        try {
            const pageList = newData?.page;
            pageList?.forEach((item: any) => {
                item.config.home = item?.path === path;
            })
            return newData;
        } catch (e) {
            $message({
                type: "error",
                message: "内部错误",
                offset: 80
            })
            return newData;
        }
    }
}


/**
 * @description 切换主页函数
 * @param path
 */
export function changeHomePage(path: any) {
    const localData = JSON.parse(sessionStorage.getItem(localKey) as string);
    // 如果存在 session storage
    if (localData) {
        const newData = handleChangeHome(localData, path);
        setSessionStorage(localKey, newData);
    } else {
        // 如果不存在 session storage
        const data = JSON.parse(JSON.stringify(initJson));
        const newData = handleChangeHome(data, path);
        setSessionStorage(localKey, newData);
    }
}
