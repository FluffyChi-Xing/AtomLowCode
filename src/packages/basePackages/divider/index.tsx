import {ElDivider} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {computed} from "vue";
import {createEditorSelectProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'divider',
    moduleName: 'basePackages',
    label: '分割线',
    preview: () => <ElDivider border-style={'dashed'}>分割线</ElDivider>,
    render: ({ props, block, styles}) => {
        const { registerRef } = useGlobalProperties();
        const style = computed(() => ({
            width: '100%',
        }));


        return () => (
            <div style={styles}>
                <ElDivider ref={(el) => registerRef(el, block._vid)} {...props} style={style.value}></ElDivider>
            </div>
        )
    },
    resize: {
      width: true,
      height: true,
    },
    props: {
        // 分割线方向
        direction: createEditorSelectProp({
            label: '分割线方向',
            options: [
                {
                    label: '水平',
                    value: 'horizontal'
                },
                {
                    label: '垂直',
                    value: 'vertical'
                }
            ],
            defaultValue: 'horizontal'
        }),
        // 分隔符样式
        borderStyle: createEditorSelectProp({
            label: '分隔符样式',
            options: [
                {
                    label: '无',
                    value: 'none'
                },
                {
                    label: '实线',
                    value: 'solid'
                },
                {
                    label: '隐藏',
                    value: 'hidden'
                },
                {
                    label: '虚线',
                    value: 'dashed'
                }
            ],
            defaultValue: 'dashed'
        })
    },
    styles: {

    }
} as VisualEditorComponent
