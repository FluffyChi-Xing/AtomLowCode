import {defineComponent, PropType} from "vue";
import type {VisualEditorTypes} from "@/views/VisualEditor/_componsables/api/visualEditorTypes";

export default defineComponent({
    name: 'ComponentRender',
    props: {
        // Define the prop
        element: {
            type: Object as PropType<VisualEditorTypes>, // type of the prop
            default: () => ({}), // default value
        },
    },
    setup(props) {
        // TODO: Implement the setup function
    }
})
