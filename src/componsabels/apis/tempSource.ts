import {$request} from "@/componsabels/request";

const mockSource = 'https://api.gumengya.com/Api'
export async function getHotPoint() {
    const api = '/BaiduTieBaHot'
    const method = 'GET'
    return $request(mockSource + api, method);
}
