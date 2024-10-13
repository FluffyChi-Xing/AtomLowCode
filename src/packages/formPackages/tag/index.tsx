import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElTag} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'tag',
    moduleName: 'formPackages',
    label: '标签',
    preview: () => <div>
        <ElTag
            type={'success'}
            size={'large'}
            closable={true}
        >
            标签
        </ElTag>
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElTag
                    ref={(el) => registerRef(el, block._vid)}
                    {...props}
                />
            </div>
        )
    },
    props: {
        closable: createEditorInputProp({
            label: '是否可关闭',
            defaultValue: true
        }),
        type: createEditorSelectProp({
            label: '类型',
            options: [
                {
                    label: '成功',
                    value: 'success'
                },
                {
                    label: '信息',
                    value: 'info'
                },
                {
                    label: '警告',
                    value: 'warning'
                },
                {
                    label: '危险',
                    value: 'danger'
                },
                {
                    label: '默认',
                    value: 'primary'
                }
            ],
            defaultValue: 'success'
        }),
        size: createEditorSelectProp({
            label: '尺寸',
            options: [
                {
                    label: '大',
                    value: 'large'
                },
                {
                    label: '小',
                    value: 'small'
                },
                {
                    label: '默认',
                    value: 'default'
                }
            ],
            defaultValue: 'default'
        })
    },
    styles: {

    },
    events: [
        {
            label: '点击标签时触发',
            value: 'click'
        }
    ]
} as VisualEditorComponent;
