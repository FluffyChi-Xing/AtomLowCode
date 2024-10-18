import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElTooltip} from "element-plus";
import SectionItem from "@/views/VisualEditor/_components/simulator/_components/SectionItem.vue";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'tooltip',
    moduleName: 'formPackages',
    label: '提示框',
    preview: () => {
        const subComp = [];
      return (
          <div class={'w-full h-auto flex flex-col'}>
              <ElTooltip
                  effect={'dark'}
                  content={'这是一个提示框'}
                  placement={'bottom'}
              >
                  <SectionItem
                      list={subComp}
                      label={'嵌套组件'}
                      drag={true}
                      isShow={false}
                  />
              </ElTooltip>
          </div>
      )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();


        return () => (
            <div style={styles}>
                <ElTooltip
                    ref={(el) => registerRef(el, block._vid)}
                    {...props}
                >
                    <SectionItem
                        list={props?.subComp || []}
                        label={'嵌套组件'}
                        drag={true}
                        isShow={false}
                    />
                </ElTooltip>
            </div>
        )
    },
    props: {
        content: createEditorInputProp({
           label: '内容',
           defaultValue: '这是一个提示框'
        }),
        effect: createEditorSelectProp({
            label: '效果',
            options: [
                {
                    label: 'dark',
                    value: 'dark'
                },
                {
                    label: 'light',
                    value: 'light'
                }
            ],
            defaultValue: 'dark'
        }),
        placement: createEditorSelectProp({
            label: '位置',
            options: [
                {
                    label: 'top',
                    value: 'top'
                },
                {
                    label: 'top-start',
                    value: 'top-start'
                },
                {
                    label: 'top-end',
                    value: 'top-end'
                },
                {
                    label: 'bottom',
                    value: 'bottom'
                },
                {
                    label: 'bottom-start',
                    value: 'bottom-start'
                },
                {
                    label: 'bottom-end',
                    value: 'bottom-end'
                },
                {
                    label: 'left',
                    value: 'left'
                },
                {
                    label: 'left-start',
                    value: 'left-start'
                },
                {
                    label: 'left-end',
                    value: 'left-end'
                },
                {
                    label: 'right',
                    value: 'right'
                },
                {
                    label: 'right-start',
                    value: 'right-start'
                },
                {
                    label: 'right-end',
                    value: 'right-end'
                }
            ],
            defaultValue: 'bottom'
        }),
        subComp: []
    },
    styles: {

    }
} as VisualEditorComponent;
