import {visualConfig} from "@/componsabels/visual-config";
import {$message} from "@/componsabels/Element-Plus";

export function useKeyGetComp(comp: any): any {
    return new Promise((resolve, reject) => {
        try {
            if (comp?.key) {
                const compKey = comp?.key;
                const result = visualConfig.componentMap[compKey];
                resolve(result);
            } else {
                const result = visualConfig.componentMap[comp];
                resolve(result);
            }
        } catch (e) {
            $message({
                type: "error",
                message: "未知错误",
                offset: 80
            })
            reject(e);
        }
    });
}
