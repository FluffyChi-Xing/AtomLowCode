import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElCard} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";

export default {
    key: 'card',
    moduleName: 'basePackages',
    label: '卡片',
    preview: () => <ElCard>卡片</ElCard>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElCard ref={(el) => registerRef(el, block._vid)} {...props}></ElCard>
            </div>
        );
    },
    resize: {
        width: true,
        height: true,
    },
    props: {

    },
    styles: {

    }
} as VisualEditorComponent
