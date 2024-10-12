import type {VisualEditorComponent} from "@/views/VisualEditor/_componsables/utils/visual-editor-utils";
import {ElTable, ElTableColumn} from "element-plus";
import {data} from "autoprefixer";
import {useGlobalProperties} from "@/views/VisualEditor/_componsables/hooks/useGlobalProperties";
import {createEditorInputProp} from "@/views/VisualEditor/_componsables/api/visual-editor.props";

export default {
    key: 'baseTable',
    moduleName: 'formPackages',
    label: '基础表格',
    preview: () => <ElTable data={[
        {
            id: 1,
            name: '张三',
            company: '阿里巴巴',
            age: 20
        },
        {
            id: 2,
            name: '李四',
            company: '腾讯',
            age: 30
        },
        {
            id: 3,
            name: '王五',
            company: '字节跳动',
            age: 40
        }
    ]} fit={true} stripe={true}>
        <ElTableColumn label={'序号'} prop={'id'} />
        <ElTableColumn label={'姓名'} prop={'name'} />
        <ElTableColumn label={'公司'} prop={'company'} />
        <ElTableColumn label={'年龄'} prop={'age'} />
    </ElTable>,
    render: ({ props, block, styles}) => {
        const { registerRef } = useGlobalProperties(); // 注册ref

        return () => (
            <div style={styles}>
                <ElTable ref={(el) => registerRef(el, block._vid)} {...props}>
                    {
                        props?.labelProp.forEach((item) => (
                            <>
                                <ElTableColumn label={item.label} prop={item.prop} width={item?.width} />
                            </>
                        ))
                    }
                </ElTable>
            </div>
        )
    },
    props: {
        data: [],
        labelProp:[],
        stripe: createEditorInputProp({
            label: '斑马纹',
            defaultValue: false
        }),
        border: createEditorInputProp({
            label: '边框',
            defaultValue: false
        }),
        fit: createEditorInputProp({
            label: '自适应',
            defaultValue: true
        })
    },
    styles: {

    },
} as VisualEditorComponent;
