import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElPagination} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'pagination',
    moduleName: 'basePackages',
    label: '分页',
    preview: () => <div>
        <ElPagination
            layout={'prev, pager, next'}
            total={50}
            background={true}
        />
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElPagination
                    ref={(el) => registerRef(el, block._vid)}
                    {...props}
                />
            </div>
        )
    },
    props: {
        layout: createEditorInputProp({
            label: '布局',
            defaultValue: 'prev, pager, next'
        }),
        background: createEditorSelectProp({
            label: '背景',
            options: [
                {
                    label: '默认',
                    value: false
                },
                {
                    label: '背景',
                    value: true
                }
            ],
            defaultValue: true
        }),
        total: createEditorInputProp({
            label: '总数',
            defaultValue: 50
        }),
        pageSize: createEditorInputProp({
            label: '每页显示条目个数',
            defaultValue: 10
        })
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
