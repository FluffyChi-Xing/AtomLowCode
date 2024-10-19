import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {$api} from "@/componsabels/api";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {onMounted, ref} from "vue";

export default {
    key: 'todayHot',
    moduleName: 'businessPackages',
    label: '今日热点',
    preview: () => {
        let list = [];
        const tempList = [
            {
                title: '朝鲜向韩国提出最后通牒'
            },
            {
                title: '美国疫情再次爆发'
            },
            {
                title: '国足成功赢得比赛'
            },
            {
                title: '中国成功发射火箭'
            },
            {
                title: '马斯克买入比特币'
            },
            {
                title: '特斯拉濒临破产，马斯克抛售公司股票'
            }
        ]
        async function getHotData() {
            await $api.getHotPoint().then((res: any) => {
                list = res.data;
            })
        }
        onMounted(async () => {
            console.log('热点组件挂载', list)
            await getHotData();
        })
        return (
            <div class={'w-full bg-[#F3F2FF] h-auto flex flex-col rounded-[10px] overflow-hidden p-4'}>
                <div class={'w-full h-auto flex text-[15px] font-bold'}>
                    今日热搜
                </div>
                <div class={'w-full h-auto flex text-[10px] text-gray-500'}>
                    深度搜索你关心的问题
                </div>
                <div class={'w-full h-auto flex flex-col mt-4'}>
                    {
                        tempList.map((item: any, index: number) => (
                            <>
                                <div class={'w-full h-auto flex text-[15px] whitespace-nowrap overflow-hidden text-ellipsis'}>
                                    <span
                                        class={['text-gray-500 font-bold mr-2', index < 3 ? 'text-red-500' : '']}
                                    >
                                        { index + 1 }
                                    </span>
                                    <span>{ item.title }</span>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();
        const list = ref([]);
        $api.getHotPoint().then((res: any) => {
            list.value = res.data;
        })
        return (
            <div
                ref={(el) => registerRef(el, block._vid)}
                {...props}
                style={styles}
                class={'w-full bg-[#F3F2FF] h-auto flex flex-col rounded-[10px] overflow-hidden p-4'}
            >
                <div class={'w-full h-auto flex text-[15px] font-bold'}>
                    今日热搜
                </div>
                <div class={'w-full h-auto flex text-[10px] text-gray-500'}>
                    深度搜索你关心的问题
                </div>
                <div class={'w-full h-auto flex flex-col mt-4'}>
                    {
                        list.value.map((item: any, index: number) => (
                            <>
                                <div class={'w-full h-auto flex text-[15px] whitespace-nowrap overflow-hidden text-ellipsis'}>
                                    <span
                                        class={['text-gray-500 font-bold', index < 3 ? 'text-red-500' : '']}
                                    >
                                        { index }
                                    </span>
                                    <span>{ item.title }</span>
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>
        )
    },
    props: {

    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
