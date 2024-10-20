import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {ElScrollbar} from "element-plus";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'code',
    moduleName: 'businessPackages',
    label: '代码块',
    preview: () => {
        const code = '<template>\n' +
            '  <el-row class="demo-avatar demo-basic">\n' +
            '    <el-col :span="12">\n' +
            '      <div class="sub-title">circle</div>\n' +
            '      <div class="demo-basic--circle">\n' +
            '        <div class="block">\n' +
            '          <el-avatar :size="50" :src="circleUrl" />\n' +
            '        </div>\n' +
            '        <div v-for="size in sizeList" :key="size" class="block">\n' +
            '          <el-avatar :size="size" :src="circleUrl" />\n' +
            '        </div>\n' +
            '      </div>\n' +
            '    </el-col>\n' +
            '    <el-col :span="12">\n' +
            '      <div class="sub-title">square</div>\n' +
            '      <div class="demo-basic--circle">\n' +
            '        <div class="block">\n' +
            '          <el-avatar shape="square" :size="50" :src="squareUrl" />\n' +
            '        </div>\n' +
            '        <div v-for="size in sizeList" :key="size" class="block">\n' +
            '          <el-avatar shape="square" :size="size" :src="squareUrl" />\n' +
            '        </div>\n' +
            '      </div>\n' +
            '    </el-col>\n' +
            '  </el-row>\n' +
            '</template>'
        return (
            <div class={'w-full h-auto flex flex-col p-4 text-[15px]'}>
                <ElScrollbar class={'w-full h-full flex-1'}>
                    <p class={'w-full h-auto flex items-center justify-start'}>代码块</p>
                    <highlightjs
                        language={'javascript'}
                        code={code}
                        className={'w-full h-auto'}
                    />
                </ElScrollbar>
            </div>
        )
    },
    render: ({ props, block, styles }) => {
        const { registerRef } = useGlobalProperties();

        return () => (
            <div
                styles={styles}
                class={'w-full h-auto flex flex-col p-4 text-[15px]'}
                ref={(el) => registerRef(el, block._vid)}
                {...props}
            >
                <ElScrollbar class={'w-full h-full flex-1'}>
                    <p class={'w-full h-auto flex items-center justify-start'}>代码块</p>
                    <highlightjs
                        language={'javascript'}
                        code={props.content}
                        className={'w-full h-auto'}
                    />
                </ElScrollbar>
            </div>
        )
    },
    props: {
        content: createEditorInputProp({
            label: '代码块',
            defaultValue: 'some code block here'
        })
    },
    styles: {

    },
    resize: {
        width: true,
        height: true
    }
} as VisualEditorComponent;
