import {ofetch} from "ofetch";
import {$message} from "@/componsabels/Element-Plus";
import {$enum} from "@/componsabels/enum";

/**
 * $request 请求封装
 * @param url
 * @param requestBody
 * @param header
 */
export async function $request(url: string, requestBody: any, header?: any): any {
    if (url) {
        // requestBody 类型判断
        const body = checkBody(requestBody, header);
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
                        reportError(url, error, '内部错误');
                    }
                })
            } catch (e) {
                // 请求异常处理
                reportError(url, e, '非内部错误');
                reject(e);
            }
        })
    }
}

/**
 * requestBody requestbody 类型判断
 * @param params
 * @param moreHeader
 */
function checkBody(params: any, moreHeader?: any) {
    if (typeof params === 'object') {
        // 判断是否为复杂requestBody
        const baseHeader = {
            'Content-Type': 'application/json',
            ...moreHeader
        }
        params.append('headers', baseHeader);
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


/**
 * reportError 错误上报
 * @param api
 * @param content
 * @param type
 */
function reportError(api: string, content: any, type: string) {
    console.log(api, content, type);
}
