import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElForm, ElFormItem} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";

export default {
    key: 'baseForm',
    moduleName: 'formPackages',
    label: '基础表单',
    preview: () => <div style={'display: flex;flex-flow: column nowrap;'}>
        <ElForm label-width={'auto'}>
            <ElFormItem label={'表元素1'}>
                <SectionItem
                    list={[]}
                    label={'嵌套组件'}
                    drag={true}
                    isShow={false}
                />
            </ElFormItem>
            <ElFormItem label={'表元素2'}>
                <SectionItem
                    list={[]}
                    label={'嵌套组件'}
                    drag={true}
                    isShow={false}
                />
            </ElFormItem>
            <ElFormItem label={'表元素3'}>
                <SectionItem
                    list={[]}
                    label={'嵌套组件'}
                    drag={true}
                    isShow={false}
                />
            </ElFormItem>
            <ElFormItem label={'表元素4'}>
                <SectionItem
                    list={[]}
                    label={'嵌套组件'}
                    drag={true}
                    isShow={false}
                />
            </ElFormItem>
        </ElForm>
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElForm ref={(el) => registerRef(el, block._vid)} {...props}>
                    {
                        props.items?.forEach((item: any) => (
                            <>
                                <ElFormItem
                                    label={item.label}
                                    prop={item.prop}
                                >
                                    <SectionItem
                                        list={[]}
                                        label={'嵌套组件'}
                                        drag={true}
                                        isShow={false}
                                    />
                                </ElFormItem>
                            </>
                        ))
                    }
                </ElForm>
            </div>
        )
    },
    props: {
        items: [],
        labelWidth: createEditorInputProp({
            label: '标签宽度',
            defaultValue: 'auto'
        }),
        model: [],
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
