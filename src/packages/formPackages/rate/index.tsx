import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElRate} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'rate',
    moduleName: 'formPackages',
    label: '评分',
    preview: () => <ElRate model-value={4.5} allow-half={true} clearable={true} size={'default'} />,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElRate ref={(el) => registerRef(el, block._vid)} {...props} />
            </div>
        )
    },
    props: {
        allowHalf: createEditorInputProp({
           label: '是否允许半选',
           defaultValue: false
        }),
        size: createEditorSelectProp({
            label: '尺寸',
            options: [
                {
                    label: '大',
                    value: 'large'
                },
                {
                    label: '默认',
                    value: 'default'
                },
                {
                    label: '小',
                    value: 'small'
                }
            ],
            defaultValue: 'default'
        }),
        clearable: createEditorInputProp({
            label: '是否可以取消选择',
            defaultValue: true
        })
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
