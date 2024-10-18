import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElAvatar, ElButton} from "element-plus";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'login-card',
    moduleName: 'businessPackages',
    label: '登录卡片',
    preview: () => {
        const image = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        return (
            <div class={'w-full h-auto p-4 flex flex-col'}>
                <div class={'w-full h-auto flex flex-col'}>
                    <div class={'w-full h-auto flex'}>
                        <div class={'w-auto h-full flex items-center mr-2'}>
                            <ElAvatar src={image} shape={'circle'}/>
                        </div>
                        <div class={'w-full h-auto flex flex-col'}>
                            <div class={'w-full h-6 flex whitespace-nowrap text-ellipsis font-bold text-[15px]'}>
                                游客saHas..
                            </div>
                            <div class={'w-full text-gray-500 h-auto flex items-center'}>
                                注册 | 开店
                            </div>
                        </div>
                    </div>
                    <div class={'w-full h-auto flex mt-4 items-center justify-center text-[15px] font-bold'}>
                        登录后更精彩
                    </div>
                    <div class={'w-full h-auto flex items-center justify-center mt-4'}>
                        <ElButton style={'background: #FF5000 !important;color: white;'} class={'w-full max-w-[375px] text-white text-[20px] bg-[#FF5000] font-bold'}>立即登录</ElButton>
                    </div>
                </div>
            </div>
        )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div style={styles} ref={(el) => registerRef(el, block._vid)} {...props}>
                <div class={'w-full h-auto flex flex-col'}>
                    <div class={'w-full h-auto flex'}>
                        <div class={'w-auto h-full flex items-center mr-2'}>
                            <ElAvatar src={props.image} shape={props.shape}/>
                        </div>
                        <div class={'w-full h-auto flex flex-col'}>
                            <div class={'w-full h-6 flex whitespace-nowrap text-ellipsis font-bold text-[15px]'}>
                                { props.buyer }
                            </div>
                            <div class={'w-full text-gray-500 h-auto flex items-center'}>
                                注册 | 开店
                            </div>
                        </div>
                    </div>
                    <div class={'w-full h-auto flex mt-4 items-center justify-center text-[15px] font-bold'}>
                        { props.info }
                    </div>
                    <div class={'w-full h-auto flex items-center justify-center mt-4'}>
                        <ElButton style={'background: #FF5000 !important;color: white;'} class={'w-full max-w-[375px] text-white text-[20px] font-bold'}>立即登录</ElButton>
                    </div>
                </div>
            </div>
        )
    },
    props: {
        image: createEditorInputProp({
            label: '图片地址',
            defaultValue: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        }),
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
        info: createEditorInputProp({
            label: '提示信息',
            defaultValue: '登录后更精彩'
        }),
        buyer: createEditorInputProp({
            label: '用户名',
            defaultValue: '游客saHas..'
        })
    },
    styles: {

    },
    events: [
        {
            label: '点击登录',
            value: 'click'
        }
    ]
} as VisualEditorComponent;
