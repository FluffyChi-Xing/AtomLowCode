import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElInput} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";

export default {
    key: 'input',
    moduleName: 'formPackages',
    label: '输入框',
    preview: () => <ElInput placeholder={'这是一个输入框'} clearable={true} prefix-icon={'Search'} />,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElInput ref={(el) => registerRef(el, block._vid)} {...props} />
            </div>
        )
    },
    props: {
        data: '',
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
