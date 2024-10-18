import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";

export default {
    key: 'grid',
    moduleName: 'layoutPackages',
    label: '1×9栅格布局',
    preview: () => {
        const itemNum = [1, 2, 3];
        return (
            <div class={'w-full h-auto grid grid-cols-3 gap-4'}>
                {
                    itemNum.map(() => {
                        return (
                            <div>
                                <SectionItem
                                    list={[]}
                                    label={'嵌套组件'}
                                    drag={true}
                                    isShow={false}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div
                style={styles}
                class={'w-full h-auto grid grid-cols-3 gap-4'}
                ref={(el) => registerRef(el, block._vid)}
                {...props}
            >
                {
                    props.item?.forEach((item: any) => {
                        return (
                            <div>
                                <SectionItem
                                    list={item?.list}
                                    label={'嵌套组件'}
                                    drag={true}
                                    isShow={false}
                                />
                            </div>
                        )
                    })
                }
            </div>
        )
    },
    props: {
        item: []
    },
    resize: {
        width: true,
        height: true
    },
    styles: {

    }
} as VisualEditorComponent;
