import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'bannerAd',
    moduleName: 'businessPackages',
    label: 'Banner广告',
    preview: () => {
        const src = 'https://img.alicdn.com/imgextra/i1/O1CN01wZhY2Y1abR1og16N1_!!6000000003348-2-tps-7680-120.png'
        return (
            <div style={'width: 100%;height: 40px;display: flex;align-items: center;justify-content: center'}>
                <img style={'width: 100%;height: 100%;object-fit: cover;'} src={src} alt={'banner位广告'} />
            </div>
        )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles} ref={(el) => registerRef(el, block._vid)} {...props}>
                <img style={'width: 100%;height: 100%;object-fit: contain;'} src={props.image} alt={props?.alt} />
            </div>
        )
    },
    props: {
        image: createEditorInputProp({
            label: '图片地址',
            defaultValue: 'https://img.alicdn.com/imgextra/i1/O1CN01wZhY2Y1abR1og16N1_!!6000000003348-2-tps-7680-120.png'
        }),
        alt: createEditorInputProp({
            label: '图片描述',
            defaultValue: 'banner位广告'
        })
    },
    styles: {

    }
} as VisualEditorComponent;
