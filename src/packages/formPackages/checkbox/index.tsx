import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElCheckbox, ElCheckboxGroup} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'checkbox',
    moduleName: 'formComponents',
    label: '多选框',
    preview: () => <div>
        <ElCheckboxGroup model-value={['1']}>
            <ElCheckbox
                label={'复选框 A'}
                value={'1'}
            />
            <ElCheckbox
                label={'复选框 B'}
                value={'2'}
            />
        </ElCheckboxGroup>
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElCheckboxGroup ref={(el) => registerRef(el, block._vid)} {...props}>
                    {
                        props.items?.forEach((item: any) => {
                            return (
                                <ElCheckbox
                                    label={item?.label}
                                    value={item?.value}
                                />
                            )
                        })
                    }
                </ElCheckboxGroup>
            </div>
        )
    },
    props: {
        modelValue: createEditorInputProp({
            label: '绑定值',
            defaultValue: ['1'],
        }),
        items: []
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
