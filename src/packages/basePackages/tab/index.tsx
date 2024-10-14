import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElTabPane, ElTabs} from "element-plus";
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";

export default {
    key: 'tab',
    moduleName: 'basePackages',
    label: '标签页',
    preview: () => <div>
        <ElTabs model-value={'1'} type={'border-card'}>
            <ElTabPane label={'选项一'} name={'1'}>
                <SectionItem
                    list={[]}
                    label={'嵌套组件'}
                    drag={true}
                    isShow={false}
                />
            </ElTabPane>
            <ElTabPane label={'选项二'} name={'2'}>
                <SectionItem
                    list={[]}
                    label={'嵌套组件'}
                    drag={true}
                    isShow={false}
                />
            </ElTabPane>
            <ElTabPane label={'选项三'} name={'3'}>
                <SectionItem
                    list={[]}
                    label={'嵌套组件'}
                    drag={true}
                    isShow={false}
                />
            </ElTabPane>
        </ElTabs>
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElTabs ref={(el) => registerRef(el, block._vid)} {...props}>
                    {
                        props.items?.for((item: any) => (
                            <ElTabPane label={item.label} name={item.name}>
                                <SectionItem
                                    list={[]}
                                    label={'嵌套组件'}
                                    drag={true}
                                    isShow={false}
                                />
                            </ElTabPane>
                        ))
                    }
                </ElTabs>
            </div>
        )
    },
    props: {
        items: [],
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
