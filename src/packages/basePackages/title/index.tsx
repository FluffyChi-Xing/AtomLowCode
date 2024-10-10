import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";

export default {
    key: 'title',
    moduleName: 'basePackages',
    label: '标题',
    preview: () => <h1>标题</h1>,
    render: ({ props, block, styles}) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <h1 ref={(el) => registerRef(el, block._vid)} {...props}></h1>
            </div>
        );
    },
    resize: {
        width: true,
        height: true,
    },
    events: {

    },
    props: {

    }
} as VisualEditorComponent
