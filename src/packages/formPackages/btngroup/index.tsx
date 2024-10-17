import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElButton, ElButtonGroup} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'btngroup',
    moduleName: 'formComponents',
    label: '按钮组',
    preview: () => <div>
        <ElButtonGroup>
            <ElButton type={'primary'} size={'default'} icon={'Document'}>按钮 A</ElButton>
            <ElButton type={'primary'} size={'default'} icon={'Document'}>按钮 B</ElButton>
        </ElButtonGroup>
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElButtonGroup ref={(el) => registerRef(el, block._vid)} {...props}>
                    {
                        props.buttons?.forEach((item: any) => {
                            return (
                                <ElButton>{ item?.label }</ElButton>
                            )
                        })
                    }
                </ElButtonGroup>
            </div>
        )
    },
    props: {
        type: createEditorSelectProp({
            label: '按钮类型',
            options: [
                {
                    label: '默认',
                    value: 'default'
                },
                {
                    label: '主要',
                    value: 'primary'
                },
                {
                    label: '成功',
                    value: 'success'
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
                    label: '文本',
                    value: 'text'
                },
                {
                    label: '信息',
                    value: 'info'
                }
            ],
            defaultValue: 'default'
        }),
        size: createEditorSelectProp({
            buttons: [],
            label: '按钮尺寸',
            options: [
                {
                    label: '大型',
                    val: 'large'
                },
                {
                    label: '默认',
                    val: 'default'
                },
                {
                    label: '小型',
                    val: 'small'
                }
            ],
            defaultValue: 'default'
        }),
        icon: createEditorInputProp({
            label: '图标',
            defaultValue: 'Document'
        })
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
