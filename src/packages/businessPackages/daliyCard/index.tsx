import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {ElIcon} from "element-plus";
import {Location} from "@element-plus/icons-vue";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'daliyCard',
    moduleName: 'businessPackages',
    label: '日历卡片',
    preview: () => {
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        const image = 'https://gw.alicdn.com/imgextra/i1/O1CN01ITy8XM1ZsYDMdtbEi_!!6000000003250-0-tps-750-1303.jpg'
        return (
            <div
                style={'background-image: url(' + image + ');background-size: cover;background-repeat: no-repeat;background-position: top;' }
                class={'w-full h-full max-h-[400px] flex justify-end rounded-[10px] overflow-hidden'}
            >
                <div class={'w-1/2 h-full flex flex-col p-4 justify-center'}>
                    <div class={'text-[40px] justify-center flex w-full h-auto font-bold text-white'}>{ day }</div>
                    <div class={'w-full mx-auto max-w-[100px] my-4 justify-center items-center h-auto flex border border-white rounded-[5px] overflow-hidden'}>
                        <span class={'text-white'}>{ year }.{ month }</span>
                    </div>
                    <div class={'mt-auto w-full h-auto items-center flex text-white text-[10px]'}>
                        <ElIcon><Location /></ElIcon>
                        <span>中国-湛江 中国大陆南极村</span>
                    </div>
                </div>
            </div>
        )
    },
    render: ({ props, block }) => {
        const { registerRef } = useGlobalProperties();

        return (
            <div
                ref={(el) => registerRef(el, block._vid)}
                {...props}
                style={'background-image: url(' + props.image + ');background-size: cover;background-repeat: no-repeat;background-position: top;' }
                class={'w-full h-full max-h-[400px] flex justify-end rounded-[10px] overflow-hidden'}
            >
                <div class={'w-1/2 h-full flex flex-col p-4 justify-center'}>
                    <div class={'text-[40px] w-full h-auto justify-center flex font-bold text-white'}>{ day }</div>
                    <div class={'w-full mx-auto h-auto max-w-[100px] my-4 justify-center items-center flex border border-white rounded-[5px] overflow-hidden'}>
                        <span class={'text-white'}>{ year }.{ month }</span>
                    </div>
                    <div class={'mt-auto w-full h-auto items-center flex text-white text-[10px]'}>
                        <ElIcon><Location /></ElIcon>
                        <span>{ props?.location }</span>
                    </div>
                </div>
            </div>
        )
    },
    props: {
        image: createEditorInputProp({
            label: '背景图片',
            defaultValue: 'https://gw.alicdn.com/imgextra/i1/O1CN01ITy8XM1ZsYDMdtbEi_!!6000000003250-0-tps-750-1303.jpg'
        }),
        location: createEditorInputProp({
            label: '地点',
            defaultValue: '中国-湛江 中国大陆南极村'
        })
    }
} as VisualEditorComponent;
