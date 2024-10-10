import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElTag} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorSelectProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'tag',
    moduleName: 'basePackages',
    label: '标签',
    preview: () => <ElTag typa={'primary'}>标签</ElTag>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElTag ref={(el) => registerRef(el, block._vid)} {...props}></ElTag>
            </div>
        )
    },
    resize: {
        width: true,
        height: true,
    },
    styles: {

    },
    props: {
        type: createEditorSelectProp({
            label: '标签类型',
            options: [
                {
                    label: '默认',
                    value: 'default',
                },
                {
                    label: '主要',
                    value: 'primary',
                },
                {
                    label: '成功',
                    value: 'success',
                },
                {
                    label: '警告',
                    value: 'warning',
                },
                {
                    label: '危险',
                    value: 'danger',
                }
            ],
            defaultValue: 'primary',
        })
    }
} as VisualEditorComponent
