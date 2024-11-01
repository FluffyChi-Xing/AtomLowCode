import {ElButton} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";
import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";




export default {
    key: 'button',
    moduleName: 'basePackages',
    label: '按钮',
    preview: () => <ElButton size={'default'} loading={false} type={'primary'}>按钮</ElButton>,
    render: ({ props, block, styles}) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElButton ref={(el) => registerRef(el, block._vid)} {...props}></ElButton>
            </div>
        );
    },
    resize: {
        width: true,
        height: true,
    },
    events: [
        {
            label: '按钮点击事件',
            value: 'click',
        }
    ],
    props: {
        show: createEditorInputProp({
            label: '是否上架',
            defaultValue: true,
        }),
        text: createEditorInputProp({ label: '按钮文字', defaultValue: '按钮'}),
        type: createEditorSelectProp({
            label: '按钮类型',
            options: [
                {
                    label: '主要按钮',
                    value: 'primary',
                },
                {
                    label: '成功按钮',
                    value: 'success',
                },
                {
                    label: '默认按钮',
                    value: 'default',
                },
                {
                    label: '警告按钮',
                    value: 'warning',
                },
                {
                    label: '危险按钮',
                    value: 'danger',
                },
            ],
            defaultValue: 'default',
        }),
        loading: createEditorSelectProp({
            label: '加载状态',
            options: [
                {
                    label: '加载中',
                    value: true,
                },
                {
                    label: '非加载中',
                    value: false
                }
            ],
            defaultValue: false,
        }),
        size: createEditorSelectProp({
            label: '按钮尺寸',
            options: [
                {
                    label: '默认',
                    value: 'default'
                },
                {
                    label: '大型',
                    value: 'large'
                }
            ],
            defaultValue: 'default'
        })
    }
} as VisualEditorComponent
