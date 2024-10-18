import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'good-card',
    moduleName: 'businessPackages',
    label: '商品卡片',
    preview: () => {
        const src = 'https://img.alicdn.com/bao/uploaded///asearch.alicdn.com/bao/uploaded/O1CN01M7s9gq273tLE7kyGh_!!2211787437742.jpg'
        return (
            <div class={'w-full h-[350px] border cursor-pointer flex flex-col rounded-[10px] overflow-hidden hover:border-orange-500 p-1'}>
                <img class={'w-full h-[242px] flex object-contain rounded-[10px] overflow-hidden'} src={src} alt={'商品图片'} />
                <div class={'w-full text-[15px] h-auto max-h-10 flex items-center whitespace-pre-line text-ellipsis overflow-hidden'}>
                    专业儿童拳击鞋训练鞋散打鞋格斗鞋男女童摔跤鞋少儿泰拳鞋搏击鞋
                </div>
                <div class={'w-full text-[15px] h-auto text-orange-500 flex items-center whitespace-nowrap text-ellipsis overflow-hidden'}>
                    消费100减50
                </div>
                <div class={'w-full text-[15px] h-auto text-orange-500 flex items-center whitespace-nowrap text-ellipsis overflow-hidden'}>
                    <span class={'text-red-500 font-bold text-[15px] mr-2'}>￥248</span>
                    <span class={'text-gray-500 font-light'}>8人购买</span>
                </div>
            </div>
        )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles} ref={(el) => registerRef(el, block._vid)} {...props}>
                <img class={'w-full h-[242px] flex object-contain rounded-[10px] overflow-hidden'} src={props.src} alt={props?.alt} />
                <div class={'w-full h-auto max-h-10 flex items-center whitespace-nowrap text-ellipsis overflow-hidden'}>
                    { props?.desc }
                </div>
                <div class={'w-full h-auto text-orange-500 flex items-center whitespace-nowrap text-ellipsis overflow-hidden'}>
                    { props?.coupon }
                </div>
                <div class={'w-full text-[15px] h-auto text-orange-500 flex items-center whitespace-nowrap text-ellipsis overflow-hidden'}>
                    <span class={'text-red-500 font-bold text-[15px] mr-2'}>{ props?.price }</span>
                    <span class={'text-gray-500 font-light'}>{props?.buyer}人购买</span>
                </div>
            </div>
        )
    },
    props: {
        desc: createEditorInputProp({
            label: '描述',
            defaultValue: '专业儿童拳击鞋训练鞋散打鞋格斗鞋男女童摔跤鞋少儿泰拳鞋搏击鞋'
        }),
        coupon: createEditorInputProp({
            label: '优惠券',
            defaultValue: '消费满100减50'
        }),
        src: createEditorInputProp({
            label: '图片地址',
            defaultValue: 'https://img.alicdn.com/bao/uploaded///asearch.alicdn.com/bao/uploaded/O1CN01M7s9gq273tLE7kyGh_!!2211787437742.jpg'
        }),
        alt: createEditorInputProp({
            label: '图片描述',
            defaultValue: '商品图片'
        }),
        price: createEditorInputProp({
            label: '价格',
            defaultValue: '￥248'
        }),
        buyer: createEditorInputProp({
            label: '购买人数',
            defaultValue: '8'
        })
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
