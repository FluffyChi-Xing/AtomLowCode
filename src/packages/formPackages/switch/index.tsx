import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElSwitch} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'switch',
    moduleName: 'formComponents',
    label: '开关',
    preview: () => <div>
        <ElSwitch
            model-value={false}
        />
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElSwitch
                    ref={(el) => registerRef(el, block._vid)}
                    {...props}
                />
            </div>
        )
    },
    props: {
        modelValue: createEditorInputProp({
            label: '绑定值',
            defaultValue: false,
        })
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
