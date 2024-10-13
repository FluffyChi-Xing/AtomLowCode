import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElCard} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'nestCompTest',
    moduleName: 'basePackages',
    label: '嵌套组件测试',
    preview: () => {
        return () => (
            <div style={'width: 100%'}>
                <ElCard title={'根组件'} shadow={'never'}>
                    测试嵌套组件
                    <SectionItem
                        list={[]}
                        label={'嵌套组件'}
                        drag={true}
                        isShow={false}
                    />
                </ElCard>
            </div>
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
        )
    },
    props: {
        modelValue: [],
        group: {
            name: createEditorInputProp({
                label: '包名',
                defaultValue: 'components'
            }),
            pull: createEditorInputProp({
                label: '是否允许拖拽',
                defaultValue: false
            }),
            put: createEditorInputProp({
                label: '是否允许放置',
                defaultValue: true
            })
        }
    },
    resize: {
        width: true,
        height: true
    },
    styles: {

    }
} as VisualEditorComponent;
