import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElCarousel, ElCarouselItem} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'swiper',
    moduleName: 'basePackages',
    label: '轮播图',
    preview: () => <div>
        <ElCarousel style={'width: 100%;'} indicator-position={'outside'} motion-blur={true} height={'200px'}>
            <ElCarouselItem>
                <img style={'width: 100%;object-fit: contain;'} src={'https://picsum.photos/200/300?1'} alt={''} loading={'lazy'} />
            </ElCarouselItem>
            <ElCarouselItem>
                <img style={'width: 100%;object-fit: contain;'} src={'https://picsum.photos/200/300?2'} alt={''} loading={'lazy'} />
            </ElCarouselItem>
            <ElCarouselItem>
                <img style={'width: 100%;object-fit: contain;'} src={'https://picsum.photos/200/300?3'} alt={''} loading={'lazy'} />
            </ElCarouselItem>
            <ElCarouselItem>
                <img style={'width: 100%;object-fit: contain;'} src={'https://picsum.photos/200/300?4'} alt={''} loading={'lazy'} />
            </ElCarouselItem>
        </ElCarousel>
    </div>,
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles}>
                <ElCarousel ref={(el) => registerRef(el, block._vid)} {...props}>
                    {
                        props.items?.forEach((item: any, index: number) => (
                            <>
                                <ElCarouselItem key={index}>
                                    <img src={item} alt="" />
                                </ElCarouselItem>
                            </>
                        ))
                    }
                </ElCarousel>
            </div>
        )
    },
    props: {
        item: [],
        motionBlur: createEditorInputProp({
            label: '动态模糊',
            defaultValue: true
        }),
        height: createEditorInputProp({
            label: '高度',
            defaultValue: '200px'
        }),
        direction: createEditorSelectProp({
            label: '方向',
            options: [
                {
                    label: '水平',
                    value: 'horizontal'
                },
                {
                    label: '垂直',
                    value: 'vertical'
                }
            ],
            defaultValue: 'horizontal'
        })
    }
} as VisualEditorComponent;
