import {ElButton} from "element-plus";

export default {
    key: 'button',
    moduleName: 'basePackages',
    label: '按钮',
    icon: 'https://alifd.oss-cn-hangzhou.aliyuncs.com/fusion-cool/icons/icon-light/ic_light_button.png',
    preview: () => <ElButton type={'primary'}>按钮</ElButton>,
    render: ({ props, block, styles}) => {
        // const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElButton ref={(el) => registerRef(el, block._vid)} {...props}></ElButton>
            </div>
        );
    },
    resize: {
        width: true,
        height: true,
    },
    events: {

    },
    props: {

    }
}
