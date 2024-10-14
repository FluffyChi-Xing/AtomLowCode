import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import * as echarts from 'echarts'
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {onMounted, ref, nextTick} from "vue";


export default {
    key: 'linear',
    moduleName: 'chartPackages',
    label: '折线图',
    preview: () => {
        const li = ref(null);
        onMounted(() => {
            nextTick(() => {
                const options = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: [150, 230, 224, 218, 135, 147, 260],
                            type: 'line'
                        }
                    ]
                };
                const chart = echarts.init(li.value);
                chart.setOption(options);
            });
        });
        return (
            <div ref={li} style={'height: 200px;'} />
        )
    },
    render: ({ props, block, styles}) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles} ref={(el) => registerRef(el, block._vid)} {...props} />
        )
    },
    props: {
        options: []
    },
    styles: {

    }
} as VisualEditorComponent;
