import {ElDivider} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {computed} from "vue";

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

    },
    styles: {

    }
} as VisualEditorComponent
