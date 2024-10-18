import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElAvatar} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'comment',
    moduleName: 'businessPackages',
    label: '评论',
    preview: () => {
        const image = 'https://img.alicdn.com/bao/uploaded///asearch.alicdn.com/bao/uploaded/O1CN01xp63St2BelcBzl1wC_!!2208091258364.jpg'
        return (
            <div class={'w-full h-auto flex p-1'}>
                <div class={'w-auto h-full flex ml-2 justify-center'}>
                    <ElAvatar src={'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'} shape={'circle'} />
                </div>
                <div class={'w-full h-full flex flex-col'}>
                    <div class={'w-full h-full max-h-6 flex flex-col'}>
                        <p class={'text-[8px]'}>张**三</p>
                        <span class={'text-[10px]'}>一个月前</span>
                    </div>
                    <div class={'w-full h-auto flex items-center whitespace-pre-line text-ellipsis text-[15px]'}>
                        180, 100斤,穿上很好看,质量也不错,很满意
                    </div>
                    <div class={'w-full h-auto flex items-center rounded-[5px] overflow-hidden justify-start'}>
                        <img class={'w-16 h-16 flex object-contain'} src={image} alt="" loading={'lazy'} />
                    </div>
                </div>
            </div>
        )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div
                style={styles}
                ref={(el) => registerRef(el, block._vid)}
                {...props}
            >
                <div class={'w-auto h-full flex ml-2 justify-center'}>
                    <ElAvatar src={props?.avatar} shape={props?.shape} />
                </div>
                <div class={'w-full h-full flex flex-col'}>
                    <div class={'w-full h-full max-h-6 flex flex-col'}>
                        <p class={'text-[8px]'}>{ props?.buyer }</p>
                        <span class={'text-[10px]'}>{ props?.date }</span>
                    </div>
                    <div class={'w-full h-auto flex items-center whitespace-pre-line text-ellipsis text-[15px]'}>
                        { props?.comment }
                    </div>
                    <div class={'w-full h-auto flex items-center justify-start'}>
                        <img class={'w-16 h-16 flex object-contain'} src={props?.image} alt="" />
                    </div>
                </div>
            </div>
        )
    },
    props: {
        shape: createEditorSelectProp({
            label: '形状',
            options: [
                {
                    label: '圆形',
                    value: 'circle'
                },
                {
                    label: '方形',
                    value: 'square'
                }
            ],
            defaultValue: 'circle'
        }),
        src: createEditorInputProp({
            label: '图片地址',
            defaultValue: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        }),
        buyer: createEditorInputProp({
            label: '买家',
            defaultValue: '张**三'
        }),
        comment: createEditorInputProp({
            label: '评论',
            defaultValue: '180, 100斤,穿上很好看,质量也不错,很满意'
        }),
        date: createEditorInputProp({
            label: '日期',
            defaultValue: '一个月前'
        }),
        image: createEditorInputProp({
            label: '评论图片',
            defaultValue: 'https://img.alicdn.com/bao/uploaded///asearch.alicdn.com/bao/uploaded/O1CN01xp63St2BelcBzl1wC_!!2208091258364.jpg'
        })
    },
    styles: {

    }
} as VisualEditorComponent;
