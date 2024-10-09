export namespace VisualEditorTypes {

    /**
     * @Date: 2022-10-12 21:29:32
     * @description: 画布大小类型
     * @param {icon} 图标
     * @param {label} 标签
     * @param {value} 值
     */
    export interface canvasSizeTypes {
        icon: any;
        label: string;
        value: string | null;
    }


    /**
     * @Date: 2022-10-12 21:29:32
     * @description: 基础组件类型
     * @param {label} 标签
     * @param {index} 索引
     */
    export interface baseMaterialTypes {
        label: string;
        index: string;
    }
}
