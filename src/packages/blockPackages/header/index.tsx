import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'header',
    moduleName: 'blockPackages',
    label: '标题',
    preview: () => {
        return (
            <div class={'w-full h-auto bg-white flex rounded-[10px] overflow-hidden flex-col'}>
                <span class={'text-[20px] text-black font-bold'}>标题</span>
            </div>
        )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return (
            <div
                ref={(el) => registerRef(el, block._vid)}
                style={styles}
                {...props}
                class={'w-full h-auto bg-white flex rounded-[10px] overflow-hidden flex-col'}
            >
                <span class={'text-[20px] text-black font-bold'}>{ props.content }</span>
            </div>
        )
    },
    props: {
        content: createEditorInputProp({
            label: '标题内容',
            defaultValue: '标题',
        })
    },
    styles: {

    }
} as VisualEditorComponent;
