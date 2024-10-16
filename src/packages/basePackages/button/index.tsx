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
    icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png',
    preview: () => <ElButton loading={false} type={'primary'}>按钮</ElButton>,
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
            label: '点击按钮，且按钮状态不为加载或禁用时触发',
            value: 'click',
        }
    ],
    props: {
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
        preview: "() => <ElButton loading={false} type={'primary'}>按钮</ElButton>"
    }
} as VisualEditorComponent
