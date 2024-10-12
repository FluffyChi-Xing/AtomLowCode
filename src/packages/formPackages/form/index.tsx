import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElForm, ElFormItem} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'baseForm',
    moduleName: 'formPackages',
    label: '基础表单',
    preview: () => <ElForm label-width={'auto'}>
        <ElFormItem label={'表元素1'} />
        <ElFormItem label={'表元素2'} />
        <ElFormItem label={'表元素3'} />
        <ElFormItem label={'表元素4'} />
    </ElForm>,
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
                                />
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
