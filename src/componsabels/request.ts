import {ofetch} from "ofetch";
import {$message} from "@/componsabels/Element-Plus";
import {$enum} from "@/componsabels/enum";
export async function $request(url: string, requestBody: any): any {
    if (url) {
        // requestBody 类型判断
        const body = checkBody(requestBody);
        return new Promise(( resolve, reject ) => {
            try {
                ofetch(url, body).then((response: any) => {
                    resolve(response);
                }).catch((error: any) => {
                    // 非200状态码处理
                    if (error) {
                        $message({
                            type: "warning",
                            message: $enum.HttpEnum[error?.code] ? $enum.HttpEnum[error?.code] : '请求错误'
                        })
                    }
                })
            } catch (e) {
                // 请求异常处理
                reject(e);
            }
        })
    }
}

function checkBody(params: any) {
    if (typeof params === 'object') {
        // 判断是否为复杂requestBody
        return params;
    }
    if (typeof params === 'string') {
        // 判断是否为简单requestBody
        return {
            method: params,
        }
    } else {
        // 默认为GET请求
        return 'GET';
    }
}
