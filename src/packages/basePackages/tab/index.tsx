import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElTabPane, ElTabs} from "element-plus";
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'tab',
    moduleName: 'basePackages',
    label: '标签页',
    preview: () => <ElTabs model-value={'1'} type={'border-card'} closable={false}>
        <ElTabPane label={'选项一'} name={'1'}>
            <SectionItem
                list={[]}
                label={'嵌套组件'}
                drag={true}
                isShow={false}
            />
        </ElTabPane>
        <ElTabPane label={'选项二'} name={'2'}>
            <SectionItem
                list={[]}
                label={'嵌套组件'}
                drag={true}
                isShow={false}
            />
        </ElTabPane>
        <ElTabPane label={'选项三'} name={'3'}>
            <SectionItem
                list={[]}
                label={'嵌套组件'}
                drag={true}
                isShow={false}
            />
        </ElTabPane>
    </ElTabs>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElTabs ref={(el) => registerRef(el, block._vid)} {...props}>
                    {
                        props.items?.for((item: any) => (
                            <ElTabPane label={item.label} name={item.name}>
                                <SectionItem
                                    list={[]}
                                    label={'嵌套组件'}
                                    drag={true}
                                    isShow={false}
                                />
                            </ElTabPane>
                        ))
                    }
                </ElTabs>
            </div>
        )
    },
    props: {
        items: [],
        modelValue: createEditorInputProp({
            label: '绑定值',
            defaultValue: '1',
        }),
        type: createEditorSelectProp({
            label: '样式类型',
            options: [
                {
                    label: '卡片式',
                    val: 'card'
                },
                {
                    label: '边框卡片',
                    value: 'border-card'
                }
            ],
            defaultValue: 'border-card'
        }),
        closable: createEditorSelectProp({
            label: '是否可关闭',
            options: [
                {
                    label: '是',
                    value: true
                },
                {
                    label: '否',
                    value: false
                }
            ],
            defaultValue: false
        })
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
