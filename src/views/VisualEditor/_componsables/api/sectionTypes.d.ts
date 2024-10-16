import type {
    VisualEditorComponent
} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";

export namespace SectionTypes {
    /**
     * 页面区块
     */
    export interface pageSection {
        index: number;
        label: string;
        isShow?: boolean;
        component?: any[];
    }

    /**
     * 创建组件
     */
    export interface createComp {
        sectionLabel: string;
        comp: VisualEditorComponent;
    }


    /**
     * 组件参数
     * @param componentContents 组件内容
     * @param componentType 组件类型
     * @param closable 是否可关闭
     * @param isLoading 是否加载中
     * @param motionBlur 是否模糊
     * @param height 高度
     * @param direction 方向
     * @param defaultActive 默认激活
     * @param activeTextColor 激活文本颜色
     * @param backgroundColor 背景颜色
     * @param textColor 文本颜色
     * @param mode 对齐模式
     */
    export interface componentParamsTypes {
        componentContents: string;
        componentType: string;
        closable: string;
        isLoading: boolean | string;
        motionBlur: boolean;
        height: string;
        direction: string;
        defaultActive: string;
        activeTextColor: string;
        backgroundColor: string;
        textColor: string;
        mode: string;
    }
}
