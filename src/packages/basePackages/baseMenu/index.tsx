import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElIcon, ElMenu, ElMenuItem} from "element-plus";
import {Menu} from "@element-plus/icons-vue";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {
    createEditorInputProp,
    createEditorSelectProp
} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'baseMenu',
    moduleName: 'basePackages',
    label: '基础菜单',
    preview: () => <div>
        <ElMenu
            background-color={'#031b2a'}
            text-color={'#fff'}
            active-text-color={'#ffd04b'}
            default-active={'1'}
            mode={'horizontal'}
            style={'width: 100%;height: 100%;'}
            route={false}
        >
            <ElMenuItem
                index={'1'}
            >
                <ElIcon><Menu /></ElIcon>
                <span>首页</span>
            </ElMenuItem>
            <ElMenuItem
                index={'2'}
            >
                <ElIcon><Menu /></ElIcon>
                <span>关于我们</span>
            </ElMenuItem>
            <ElMenuItem
                index={'3'}
            >
                <ElIcon><Menu /></ElIcon>
                <span>联系我们</span>
            </ElMenuItem>
        </ElMenu>
    </div>,
    render: () => {
        const { registerRef } = useGlobalProperties();

        return ({ props, block, styles }) => (
            <div style={styles}>
                <ElMenu
                    ref={(el) => registerRef(el, block._vid)}
                    {...props}
                >
                    {
                        props.items?.forEach((item: any, index: number) => (
                            <ElMenuItem
                                index={index}
                            >
                                <ElIcon><Menu /></ElIcon>
                                <span>{item.label}</span>
                            </ElMenuItem>
                        ))
                    }
                </ElMenu>
            </div>
        )
    },
    props: {
        items: [],
        activeTextColor: createEditorInputProp({
            label: '高亮文字颜色',
            defaultValue: '#ffd04b'
        }),
        defaultActive: createEditorInputProp({
            label: '默认高亮',
            defaultValue: '1'
        }),
        backgroundColor: createEditorInputProp({
            label: '背景颜色',
            defaultValue: '#031b2a'
        }),
        textColor: createEditorInputProp({
            label: '文字颜色',
            defaultValue: '#fff'
        }),
        mode: createEditorSelectProp({
            label: '菜单方向',
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
        }),
        route: createEditorSelectProp({
            label: '是否开启路由模式',
            options: [
                {
                    label: '是',
                    value: true
                },
                {
                    label: '否',
                    value: false
                }
            ],
            defaultValue: false
        })
    },
    styles: {

    },
    events: [
        {
            label: '菜单切换',
            value: 'select'
        },
        {
            label: '菜单展开',
            value: 'open'
        },
        {
            label: '菜单关闭',
            value: 'close'
        }
    ]
} as VisualEditorComponent;
