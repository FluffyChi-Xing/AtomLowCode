import {ElLink} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorSelectProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";
import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";

export default {
    key: 'link',
    moduleName: 'basePackages',
    label: '链接',
    preview: () => <ElLink type={'primary'}>链接</ElLink>,
    render: ({ props, block, styles}) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElLink ref={(el) => registerRef(el, block._vid)} {...props}></ElLink>
            </div>
        )
    },
    resize: {
        width: true,
        height: true,
    },
    props: {
        type: createEditorSelectProp({
            label: '链接类型',
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
                },
                {
                    label: '信息',
                    value: 'info',
                }
            ],
            defaultValue: 'primary',
        })
    },
} as VisualEditorComponent
