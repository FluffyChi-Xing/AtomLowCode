import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElBadge} from "element-plus";
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'badge',
    moduleName: 'formPackages',
    label: '徽标',
    preview: () => <div>
        <ElBadge type={'danger'} value={10}>
            <SectionItem
                list={[]}
                label={'嵌套组件'}
                drag={true}
                isShow={false}
            />
        </ElBadge>
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElBadge ref={(el) => registerRef(el, block._vid)} {...props}>
                    <SectionItem
                        list={[]}
                        label={'嵌套组件'}
                        drag={true}
                        isShow={false}
                    />
                </ElBadge>
            </div>
        )
    },
    props: {
        value: createEditorInputProp({
            label: '徽标值',
            defaultValue: 10
        }),
        type: createEditorSelectProp({
            label: '徽标类型',
            options: [
                {
                    label: '主要',
                    value: 'primary'
                },
                {
                    label: '成功',
                    value: 'success'
                },
                {
                    label: '警告',
                    value: 'warning'
                },
                {
                    label: '危险',
                    value: 'danger'
                }
            ],
            defaultValue: 'danger'
        })
    },
    styles: {

    },
} as VisualEditorComponent;
