import {SectionTypes} from "@/views/VisualEditor/_componsables/api/sectionTypes";

export namespace OutlineTreeTypes {
    /**
     * @description 树形结构的label
     * @param {string} label 标签
     * @param {SectionTypes.pageSection[]} children 子节点
     */
    export interface treeLabelTypes {
        label: string;
        children?: treeLabelTypes[];
    }
}
