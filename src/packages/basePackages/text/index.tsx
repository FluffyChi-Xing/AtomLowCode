import {ElText} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";

export default {
    key: 'text',
    moduleName: 'basePackages',
    label: '文本',
    preview: () => <ElText type={'primary'}>文本</ElText>,
    render: ({ props, block, styles}) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElText ref={(el) => registerRef(el, block._vid)} {...props}></ElText>
            </div>
        );
    },
    resize: {
        width: true,
        height: true
    },
    props: {

    },
    events: {

    }
} as VisualEditorComponent
