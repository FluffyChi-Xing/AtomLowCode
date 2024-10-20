import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {ElDivider, ElIcon, ElTag} from "element-plus";
import {ChatDotRound, Star, View} from "@element-plus/icons-vue";
import {
    createEditorInputProp,
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'papperColumn',
    moduleName: 'businessPackages',
    label: '文章专栏',
    preview: () => (
        <div class={'w-full h-auto flex flex-col p-4'}>
            <div class={'w-full h-auto flex whitespace-nowrap text-ellipsis overflow-hidden items-center font-bold'}>
                Android 3D弹球程序设计
            </div>
            <div class={'w-full h-auto mt-1 flex items-center justify-between'}>
                <div class={'w-1/2 h-full flex items-center'}>
                        <span class={'w-auto h-full items-center flex text-gray-500'}>
                            前端小王
                        </span>
                    <ElDivider direction={'vertical'} />
                    <span class={'w-auto h-full items-center flex text-gray-500'}>
                            3个月前
                        </span>
                    <ElDivider direction={'vertical'} />
                    <span class={'w-auto h-full items-center flex text-gray-500'}>
                            <ElIcon class={'mr-2'}><View /></ElIcon>
                            2.5 K
                        </span>
                    <ElDivider direction={'vertical'} />
                    <span class={'w-auto h-full items-center flex text-gray-500'}>
                            <ElIcon class={'mr-2'}><Star /></ElIcon>
                            29
                        </span>
                    <ElDivider direction={'vertical'} />
                    <span class={'w-auto h-full items-center flex text-gray-500'}>
                            <ElIcon class={'mr-2'}><ChatDotRound /></ElIcon>
                            4
                        </span>
                </div>
                <div class={'w-1/2 h-full flex items-center justify-end overflow-hidden'}>
                    <ElTag size={'small'} class={'ml-1'}>前端</ElTag>
                    <ElTag size={'small'} class={'ml-1'}>算法</ElTag>
                    <ElTag size={'small'} class={'ml-1'}>Android</ElTag>
                </div>
            </div>
        </div>
    ),
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return (
            <div
                ref={(el) => registerRef(el, block._vid)}
                {...props}
                style={styles}
                class={'w-full h-auto flex flex-col p-4'}
            >
                <div class={'w-full h-auto flex whitespace-nowrap text-ellipsis overflow-hidden items-center font-bold'}>
                    { props?.content }
                </div>
                <div class={'w-full h-auto mt-1 flex items-center justify-between'}>
                    <div class={'w-1/2 h-full flex items-center'}>
                        <span class={'w-auto h-full items-center flex text-gray-500'}>
                            { props?.author }
                        </span>
                        <ElDivider direction={'vertical'} />
                        <span class={'w-auto h-full items-center flex text-gray-500'}>
                            { props?.date }
                        </span>
                        <ElDivider direction={'vertical'} />
                        <span class={'w-auto h-full items-center flex text-gray-500'}>
                            <ElIcon class={'mr-2'}><View /></ElIcon>
                            { props?.view }
                        </span>
                        <ElDivider direction={'vertical'} />
                        <span class={'w-auto h-full items-center flex text-gray-500'}>
                            <ElIcon class={'mr-2'}><Star /></ElIcon>
                            { props?.like }
                        </span>
                        <ElDivider direction={'vertical'} />
                        <span class={'w-auto h-full items-center flex text-gray-500'}>
                            <ElIcon class={'mr-2'}><ChatDotRound /></ElIcon>
                            { props?.comment }
                        </span>
                    </div>
                    <div class={'w-1/2 h-full flex items-center justify-end overflow-hidden'}>
                        {
                            props?.tags.map((item: any) => (
                                <>
                                    <ElTag size={ item.size } class={'ml-1'}>{ item.label }</ElTag>
                                </>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    },
    props: {
        content: createEditorInputProp({
            label: '标题',
            defaultValue: 'Android 3D弹球程序设计'
        }),
        author: createEditorInputProp({
            label: '作者',
            defaultValue: '前端小王'
        }),
        date: createEditorInputProp({
            label: '日期',
            defaultValue: '3个月前'
        }),
        view: createEditorInputProp({
            label: '浏览量',
            defaultValue: '2.5 K'
        }),
        like: createEditorInputProp({
            label: '点赞数',
            defaultValue: '29'
        }),
        comment: createEditorInputProp({
            label: '评论数',
            defaultValue: '4'
        }),
        tags: [
            {
                label: '前端',
                size: 'small'
            },
            {
                label: '算法',
                size: 'small'
            },
            {
                label: 'Android',
                size: 'small'
            }
        ]
    },
    styles: {

    },
    events: []
} as VisualEditorComponent;
