import { defineComponent, PropType, h } from 'vue';
import { visualConfig } from '@/componsabels/visual-config';
import type { VisualEditorBlockTypes } from '@/views/VisualEditor/_componsables/utils/visual-editor-utils';

export default defineComponent({
    name: 'ComponentRender',
    props: {
        element: {
            type: Object as PropType<VisualEditorBlockTypes>,
            default: () => ({}),
        },
    },
    setup(props) {
        const component = visualConfig.componentMap[props.element.componentKey];
        return () => h(component, {
            styles: props.element.styles || {},
            props: props.element.props || {},
            model: {},
            block: props.element,
            custom: {},
        });
    },
});
