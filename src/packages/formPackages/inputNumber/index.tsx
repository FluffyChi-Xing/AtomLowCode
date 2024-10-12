import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElInputNumber} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'inputNumber',
    moduleName: 'formPackages',
    label: '数字输入框',
    preview: () => <ElInputNumber step={5} model-value={10} min={0} />,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
         <div style={styles}>
             <ElInputNumber ref={(el) => registerRef(el, block._vid)} {...props} />
         </div>
        )
    },
    props: {
        step: createEditorInputProp({
            label: '步长',
            defaultValue: 1
        }),
        modelValue: createEditorInputProp({
            label: '数据',
            defaultValue: 0
        }),
        min: createEditorInputProp({
            label: '最小值',
            defaultValue: 0
        }),
        max: createEditorInputProp({
            label: '最大值',
            defaultValue: 100
        })
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
