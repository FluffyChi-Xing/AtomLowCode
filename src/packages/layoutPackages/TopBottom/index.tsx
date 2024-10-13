import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElContainer, ElHeader, ElMain} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";

export default {
    key: 'TopBottom',
    moduleName: 'layoutComponents',
    label: '上下布局',
    preview: () => <ElContainer>
        <ElHeader>
            header
            <SectionItem
                list={[]}
                label={'嵌套组件'}
                drag={true}
                isShow={false}
            />
        </ElHeader>
        <ElMain>
            Main
            <SectionItem
                list={[]}
                label={'嵌套组件'}
                drag={true}
                isShow={false}
            />
        </ElMain>
    </ElContainer>,
    render: ({ props, block, styles}) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElContainer ref={(el) => registerRef(el, block._vid)} {...props}>
                    <ElHeader>
                        Header
                        <SectionItem
                            list={[]}
                            label={'嵌套组件'}
                            drag={true}
                            isShow={false}
                        />
                    </ElHeader>
                    <ElMain>
                        Main
                        <SectionItem
                            list={[]}
                            label={'嵌套组件'}
                            drag={true}
                            isShow={false}
                        />
                    </ElMain>
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
