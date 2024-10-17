import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";

export default {
    key: 'countdown',
    moduleName: 'businessPackages',
    label: '倒计时',
    preview: () => {
        // 获取未来一小时的时间
        const futureTime = new Date().getTime() + 60 * 60 * 1000;
        // 定义变量
        let day;
        let hour;
        let minute;
        let second;

        setInterval(function() {
            const nowTime = new Date().getTime();
            const diffTime = futureTime - nowTime;

            day = Math.floor(diffTime / (24 * 3600 * 1000));
            hour = Math.floor((diffTime % (24 * 3600 * 1000)) / (3600 * 1000));
            minute = Math.floor((diffTime % (3600 * 1000)) / (60 * 1000));
            second = Math.floor((diffTime % (60 * 1000)) / 1000);

            if (diffTime <= 0) {
                clearInterval(countdown);
            }
        }, 1000);
        return (
            <div style={'width: 100%;height: 40px;display: flex;padding: 0 10px;align-item: center;justify-content: center;'}>
                <span>
                    { day ? day : '00' }天{ hour ? hour : '00' }时{ minute ? minute : '00' }分{ second ? second : '00' }秒
                </span>
            </div>
        )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <span ref={(el) => registerRef(el, block._vid)} {...props}>
                    { day ? day : '00' }天{ hour ? hour : '00' }时{ minute ? minute : '00' }分{ second ? second : '00' }秒
                </span>
            </div>
        )
    },
    props: {

    },
    styles: {

    }
} as VisualEditorComponent;
