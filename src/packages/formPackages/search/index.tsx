import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElFormItem, ElInput} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'search',
    moduleName: 'formComponents',
    label: '搜索',
    preview: () => <div>
        <ElFormItem label={'搜索'}>
            <ElInput
                model-value={''}
                placeholder={'请输入搜索内容'}
                clearable={true}
                prefix-icon={'Search'}
            />
        </ElFormItem>
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElFormItem ref={(el) => registerRef(el, block._vid)} {...props}>
                    <ElInput
                        {...props}
                    />
                </ElFormItem>
            </div>
        )
    },
    props: {
        modelValue: createEditorInputProp({
            label: '绑定值',
            defaultValue: '',
        }),
        clearable: createEditorSelectProp({
            label: '是否可清空',
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
        }),
        prefixIcon: createEditorInputProp({
            label: '前缀图标',
            defaultValue: 'Search'
        }),
        placeholder: createEditorInputProp({
            label: '输入框占位文本',
            defaultValue: '请输入搜索内容'
        })
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
