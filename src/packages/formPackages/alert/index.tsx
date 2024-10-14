import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElAlert} from "element-plus";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";

export default {
    key: 'alert',
    moduleName: 'formPackages',
    label: '提示',
    preview: () => <div>
        <ElAlert
            type={'success'}
            title={'成功类型提示'}
            effect={'light'}
            description={'这是一段描述'}
            closable={true}
        />
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElAlert ref={(el) => registerRef(el, block._vid)} {...props} />
            </div>
        )
    },
    props: {
        type: createEditorSelectProp({
            label: '类型',
            options: [
                {
                    label: '成功',
                    value: 'success'
                },
                {
                    label: '警告',
                    value: 'warning'
                },
                {
                    label: '消息',
                    value: 'info'
                },
                {
                    label: '错误',
                    value: 'error'
                }
            ],
            defaultValue: 'success'
        }),
        effect: createEditorSelectProp({
            label: '效果',
            options: [
                {
                    label: '浅色',
                    value: 'light'
                },
                {
                    label: '深色',
                    value: 'dark'
                }
            ],
            defaultValue: 'light'
        }),
        title: createEditorInputProp({
            label: '标题',
            defaultValue: '成功类型提示'
        }),
        description: createEditorInputProp({
            label: '描述',
            defaultValue: '这是一段描述'
        })
    },
    styles: {

    },
    events: [
        {
            label: '关闭事件',
            value: 'close'
        }
    ]
} as VisualEditorComponent;
