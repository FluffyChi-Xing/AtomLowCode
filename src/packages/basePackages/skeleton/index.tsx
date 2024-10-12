import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElSkeleton} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'skeleton',
    label: '骨架屏',
    moduleName: 'basePackages',
    preview: () => <div style={'width: 100%;height: 100%'}>
        <ElSkeleton rows={7} animated ={true} />
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElSkeleton ref={(el) => registerRef(el, block._vid)} {...props} />
            </div>
        )
    },
    props: {
        rows: createEditorInputProp({
            label: '行数',
            defaultValue: 6
        }),
        animated : createEditorInputProp({
            label: '是否显示动画',
            defaultValue: true
        })
    },
    styles: {

    },
    events: [],
    resize: {
        width: true,
        height: true
    }
} as VisualEditorComponent;
