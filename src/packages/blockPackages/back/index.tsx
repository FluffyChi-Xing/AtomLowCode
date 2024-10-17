import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElButton} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'back',
    moduleName: 'blockPackages',
    label: '返回',
    preview: () => <div style={'width: 100%;height: 40px;background: #fff;display: flex;align-item: center;padding: 0 20px'}>
        <ElButton type={'text'} icon={'ArrowLeft'}>
            返回
        </ElButton>
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElButton ref={(el) => registerRef(el, block._vid)} {...props}>
                    {props.text || '返回'}
                </ElButton>
            </div>
        )
    },
    styles: {

    },
    props: {
        text: createEditorInputProp({
            label: '文本',
            defaultValue: '返回'
        }),
        icon: createEditorInputProp({
            label: '图标',
            defaultValue: 'ArrowLeft'
        }),
        content: createEditorInputProp({
            label: '内容',
            defaultValue: '首页'
        })
    },
    events: []
} as VisualEditorComponent;
