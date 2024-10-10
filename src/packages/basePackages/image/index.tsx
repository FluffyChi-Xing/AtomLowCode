import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElImage} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";

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

    },
    styles: {

    }
} as VisualEditorComponent
