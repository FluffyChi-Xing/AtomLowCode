import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElContainer, ElHeader, ElMain} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";

export default {
    key: 'TopBottom',
    moduleName: 'layoutComponents',
    label: '上下布局',
    preview: () => <ElContainer>
        <ElHeader>header</ElHeader>
        <ElMain>Main</ElMain>
    </ElContainer>,
    render: ({ props, block, styles}) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElContainer ref={(el) => registerRef(el, block._vid)} {...props}>
                    <ElHeader>Header</ElHeader>
                    <ElMain>Main</ElMain>
                </ElContainer>
            </div>
        )
    },
    props: {

    },
    styles: {

    },
    resize: {
        width: true,
        height: true
    }
} as VisualEditorComponent;
