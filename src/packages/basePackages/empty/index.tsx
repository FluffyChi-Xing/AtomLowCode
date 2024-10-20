import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElEmpty} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'empty',
    moduleName: 'basePackages',
    label: '空状态',
    preview: () => <ElEmpty description={'空状态'}>空状态</ElEmpty>,
    render: ({ props, block, styles}) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElEmpty ref={(el) => registerRef(el, block._vid)} {...props}></ElEmpty>
            </div>
        )
    },
    resize: {
        width: true,
        height: true,
    },
    props: {
        description: createEditorInputProp({
            label: '描述',
            defaultValue: '空状态'
        })
    },
    styles: {

    }
} as VisualEditorComponent
