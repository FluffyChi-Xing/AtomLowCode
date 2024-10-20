import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElImage} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'image',
    moduleName: 'basePackages',
    label: '图片',
    preview: () => <ElImage src={'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'} placeholder={'图片'} />,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElImage ref={(el) => registerRef(el, block._vid)} {...props} />
            </div>
        )
    },
    resize: {
        width: true,
        height: true,
    },
    props: {
        image: createEditorInputProp({
            label: '图片地址',
            defaultValue: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        }),
        fit: createEditorSelectProp({
            label: '图片填充方式',
            options: [
                {
                    label: '覆盖',
                    value: 'cover'
                },
                {
                    label: '填充',
                    value: 'fill'
                },
                {
                    label: '适应',
                    value: 'contain'
                },
                {
                    label: '无',
                    value: 'none'
                }
            ],
            defaultValue: 'contain'
        }),
        loading: createEditorSelectProp({
            label: '加载状态',
            options: [
                {
                    label: '懒加载',
                    value: 'lazy'
                },
                {
                    label: '默认',
                    value: 'eager'
                }
            ],
            defaultValue: 'lazy'
        }),
        lazy: createEditorInputProp({
            label: '懒加载',
            defaultValue: true
        }),
        alt: createEditorInputProp({
            label: '图片描述',
            defaultValue: '图片'
        })
    },
    styles: {

    }
} as VisualEditorComponent
