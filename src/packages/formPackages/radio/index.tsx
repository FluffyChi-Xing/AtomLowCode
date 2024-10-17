import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElRadio, ElRadioGroup} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'radio',
    moduleName: 'formComponents',
    label: '单选框',
    preview: () => <div>
        <ElRadioGroup disabled={false} border={false} model-value={'1'}>
            <ElRadio value={'1'} size={'default'}>单选 A</ElRadio>
            <ElRadio value={'2'} size={'default'}>单选 B</ElRadio>
        </ElRadioGroup>
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElRadioGroup ref={(el) => registerRef(el, block._vid)} {...props}>
                    <ElRadio value={'1'} size={'default'}>单选 A</ElRadio>
                    <ElRadio value={'2'} size={'default'}>单选 B</ElRadio>
                </ElRadioGroup>
            </div>
        )
    },
    props: {
        size: createEditorSelectProp({
            buttons: [],
            label: '按钮尺寸',
            options: [
                {
                    label: '大型',
                    val: 'large'
                },
                {
                    label: '默认',
                    val: 'default'
                },
                {
                    label: '小型',
                    val: 'small'
                }
            ],
            defaultValue: 'default'
        }),
        disabled: createEditorSelectProp({
            label: '是否禁用',
            options: [
                {
                    label: '是',
                    val: true
                },
                {
                    label: '否',
                    val: false
                }
            ],
            defaultValue: false
        }),
        border: createEditorSelectProp({
            label: '是否显示边框',
            options: [
                {
                    label: '是',
                    val: true
                },
                {
                    label: '否',
                    val: false
                }
            ],
            defaultValue: false
        }),
        modelValue: createEditorInputProp({
            label: '绑定值',
            defaultValue: '1'
        })
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
