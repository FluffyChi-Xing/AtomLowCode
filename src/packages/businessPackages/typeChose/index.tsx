import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElButton, ElButtonGroup, ElFormItem, ElInputNumber, ElRadio, ElRadioGroup} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'typeChose',
    moduleName: 'businessPackages',
    label: '类型选择',
    preview: () => {
        const image = 'https://gw.alicdn.com/bao/uploaded/i3/1583342066/O1CN01JtyY351R8HGUsQ9gJ_!!1583342066.jpg'
        return () => (
            <div class={'w-full max-w-[250px] h-auto flex flex-col p-4'}>
                <div class={'w-full h-auto flex'}>
                    <img src={image} alt={'图片说明'}  class={'w-20 mr-2 h-20 flex object-contain overflow-hidden rounded-[15px]'}/>
                    <div class={'w-full h-full flex flex-col'}>
                        <span class={'text-[15px] text-orange-500 font-bold'}>￥520</span>
                        <span class={'text-[10px] text-orange-500'}>每300减50</span>
                    </div>
                </div>
                <div class={'w-full h-auto flex flex-col'}>
                    <ElFormItem label={'鞋码'}>
                        <ElRadioGroup model-value={'1'}>
                            <ElRadio value={'1'}>37</ElRadio>
                            <ElRadio value={'2'}>38</ElRadio>
                            <ElRadio value={'3'}>39</ElRadio>
                            <ElRadio value={'4'}>40</ElRadio>
                            <ElRadio value={'5'}>41</ElRadio>
                            <ElRadio value={'6'}>42</ElRadio>
                        </ElRadioGroup>
                    </ElFormItem>
                    <ElFormItem label={'颜色分类'}>
                        <ElRadioGroup model-value={'1'}>
                            <ElRadio value={'1'}>白色 111</ElRadio>
                            <ElRadio value={'2'}>黑色 111</ElRadio>
                            <ElRadio value={'3'}>二代红色 222</ElRadio>
                            <ElRadio value={'4'}>红色 111</ElRadio>
                        </ElRadioGroup>
                    </ElFormItem>
                    <ElFormItem label={'数量'}>
                        <ElInputNumber model-value={1} min={1} max={10} step={1}/>
                    </ElFormItem>
                </div>
                <div class={'w-full h-auto flex items-center'}>
                    <ElButtonGroup>
                        <ElButton style={'background: #FF5000 !important;color: white !important;border: none !important;outline: none !important;'} size={'large'} class={'text-white'}>立即购买</ElButton>
                        <ElButton style={'background: #ffcb00 !important;color: white !important;border: none !important;outline: none !important;'} size={'large'} class={'text-white'}>加入购物车</ElButton>
                    </ElButtonGroup>
                </div>
            </div>
        )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return (
            <div
                style={styles}
                ref={(el) => registerRef(el, block._vid)}
                {...props}
                class={'w-full max-w-[250px] h-auto flex flex-col p-4'}
            >
                <div class={'w-full h-auto flex'}>
                    <img src={ props.image } alt={ props.alt }  class={'w-20 mr-2 h-20 flex object-contain overflow-hidden rounded-[15px]'}/>
                    <div class={'w-full h-full flex flex-col'}>
                        <span class={'text-[15px] text-orange-500 font-bold'}>￥{ props.price }</span>
                        <span class={'text-[10px] text-orange-500'}>{ props.coupon }</span>
                    </div>
                </div>
                <div class={'w-full h-auto flex flex-col'}>
                    {
                        props?.chosens.map((item: any) => {
                            return (
                                <ElFormItem label={item.label}>
                                    <ElRadioGroup model-value={item.modelValue}>
                                        {
                                            item.options.map((option: any) => {
                                                return (
                                                    <ElRadio value={option.value}>{ option.label }</ElRadio>
                                                )
                                            })
                                        }
                                    </ElRadioGroup>
                                </ElFormItem>
                            )
                        })
                    }
                    <ElFormItem label={'数量'}>
                        <ElInputNumber model-value={ props?.account } min={1} max={10} step={1}/>
                    </ElFormItem>
                </div>
                <div class={'w-full h-auto flex items-center'}>
                    <ElButtonGroup>
                        <ElButton style={'background: #FF5000 !important;color: white !important;border: none !important;outline: none !important;'} size={'large'} class={'text-white'}>立即购买</ElButton>
                        <ElButton style={'background: #ffcb00 !important;color: white !important;border: none !important;outline: none !important;'} size={'large'} class={'text-white'}>加入购物车</ElButton>
                    </ElButtonGroup>
                </div>
            </div>
        )
    },
    props: {
        image: createEditorInputProp({
            label: '图片地址',
            defaultValue: 'https://gw.alicdn.com/bao/uploaded/i3/1583342066/O1CN01JtyY351R8HGUsQ9gJ_!!1583342066.jpg'
        }),
        alt: createEditorInputProp({
            label: '图片说明',
            defaultValue: '图片说明'
        }),
        price: createEditorInputProp({
            label: '价格',
            defaultValue: '520'
        }),
        coupon: createEditorInputProp({
            label: '优惠券',
            defaultValue: '每300减50'
        }),
        chosen: [],
        account: createEditorInputProp({
            label: '数量',
            defaultValue: '1'
        })
    },
    styles: {

    },
    events: [
        {
            label: '点击购买',
            value: 'click'
        },
        {
            label: '点击加入购物车',
            value: 'click'
        }
    ]
} as VisualEditorComponent;
