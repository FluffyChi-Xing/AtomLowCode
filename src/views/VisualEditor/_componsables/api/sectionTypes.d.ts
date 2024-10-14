import type {VisualEditorBlockTypes} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";

export namespace SectionTypes {
    /**
     * 页面区块
     */
    export interface pageSection {
        index: number;
        label: string;
        isShow?: boolean;
        component?: VisualEditorBlockTypes[];
    }

    /**
     * 创建区块
     */
    export interface createComp {
        sectionLabel: string;
        comp: VisualEditorBlockTypes;
    }
}
