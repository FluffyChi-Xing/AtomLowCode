import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElCard} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";

export default {
    key: 'card',
    moduleName: 'basePackages',
    label: '卡片',
    preview: () => {
        const style = {
            width: '100%',
            height: '100%',
        };
        return (
            <ElCard style={style}>
                卡片
                <SectionItem
                    list={[]}
                    label={'嵌套组件'}
                    drag={true}
                    isShow={false}
                />
            </ElCard>
        )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElCard ref={(el) => registerRef(el, block._vid)} {...props}>
                    <SectionItem
                        list={[]}
                        label={'嵌套组件'}
                        drag={true}
                        isShow={false}
                    />
                </ElCard>
            </div>
        );
    },
    resize: {
        width: true,
        height: true,
    },
    props: {
        // props 为组件的属性配置
        header: createEditorInputProp({
            label: '卡片标题',
            defaultValue: '标题',
        }),
        footer: createEditorInputProp({
            label: '卡片页脚',
            defaultValue: '页脚',
        }),
        shadow: createEditorSelectProp({
            label: '阴影',
            options: [
                {
                    label: '总是',
                    value: 'always',
                },
                {
                    label: '悬停',
                    value: 'hover',
                },
                {
                    label: '从不',
                    value: 'never',
                }
            ],
            defaultValue: 'always',
        })
    },
    styles: {

    }
} as VisualEditorComponent
