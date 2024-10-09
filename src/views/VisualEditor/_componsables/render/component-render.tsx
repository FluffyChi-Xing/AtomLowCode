import {defineComponent, PropType} from "vue";
import type {VisualEditorTypes} from "@/views/VisualEditor/_componsables/api/visualEditorTypes";
import {visualConfig} from "@/componsabels/visual-config";
import type {VisualEditorBlockTypes} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";

export default defineComponent({
    name: 'ComponentRender',
    props: {
        // Define the prop
        element: {
            type: Object as PropType<VisualEditorBlockTypes>, // type of the prop
            default: () => ({}), // default value
        },
    },
    setup(props) {
        return visualConfig.componentMap[props.element.componentKey].render({
            styles: props.element.styles || {}, // styles of the element
            props: props.element.props || {}, // props of the element
            model: {}, // model of the element
            block: props.element, // block of the element
            custom: {}, // custom of the element
        })
    }
})
