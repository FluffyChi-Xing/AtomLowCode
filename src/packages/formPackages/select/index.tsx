import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElOption, ElSelect} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'select',
    moduleName: 'formPackages',
    label: '下拉选择',
    preview: () => <ElSelect model-value={'1'} placeholder={'这是一个下拉选择框'} clearable={true}>
        <ElOption
                  label={'选项1'}
                  value={'1'}
        />
        <ElOption
                  label={'选项2'}
                  value={'2'}
        />
        <ElOption
                  label={'选项3'}
                  value={'3'}
        />
    </ElSelect>,
    render: ({ props, block, styles}) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElSelect ref={(el) => registerRef(el, block._vid)} {...props}>
                    {
                        props.options?.forEach((item: any) => (
                            <>
                                <ElOption
                                    label={item.label}
                                    value={item.value}
                                />
                            </>
                        ))
                    }
                </ElSelect>
            </div>
        )
    },
    props: {
        clearable: createEditorInputProp({
            label: '是否可清空',
            defaultValue: true
        }),
        modelValue: createEditorInputProp({
            label: '绑定值',
            defaultValue: ''
        }),
        placeholder: createEditorInputProp({
            label: '占位符',
            defaultValue: '这是一个下拉选择框'
        })
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
