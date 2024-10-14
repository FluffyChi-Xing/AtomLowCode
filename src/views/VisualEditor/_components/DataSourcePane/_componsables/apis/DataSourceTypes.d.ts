export namespace DataSourceTypes {
    /**
     * @description 数据源类型
     * @param {string} name 数据源名称
     * @param {number} id 数据源ID
     * @param {string} type 数据源类型
     */
    export interface dataCardTypes {
        name: string;
        id?: number;
        type: string;
    }

    export interface cardSendMes {
        id: number;
        expand: boolean;
    }


    export interface sourcePaneMes {
        expand: boolean;
        value: dataCardTypes;
    }
}
