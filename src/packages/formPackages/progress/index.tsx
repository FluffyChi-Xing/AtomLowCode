import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElProgress} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'progress',
    moduleName: 'formPackages',
    label: '进度条',
    preview: () => {
      return (
          <div>
              <ElProgress
                  type={'circle'}
                  percentage={50}
                  status={'exception'}
              />
          </div>
      )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElProgress
                    ref={(el) => registerRef(el, block._vid)}
                    {...props}
                />
            </div>
        )
    },
    props: {
        status: createEditorSelectProp({
            label: '状态',
            options: [
                {
                    label: '成功',
                    val: 'success'
                },
                {
                    label: '异常',
                    val: 'exception'
                },
                {
                    label: '警告',
                    val: 'warning'
                }
            ],
            defaultValue: 'exception'
        }),
        percentage: createEditorInputProp({
            label: '百分比',
            defaultValue: 50
        }),
        type: createEditorSelectProp({
            label: '类型',
            options: [
                {
                    label: '线性',
                    value: 'line'
                },
                {
                    label: '环形',
                    value: 'circle'
                },
                {
                    label: '仪表盘',
                    value: 'dashboard'
                }
            ],
            defaultValue: 'circle'
        })
    },
    styles: {

    }
} as VisualEditorComponent;
