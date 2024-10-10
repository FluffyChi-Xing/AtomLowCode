import { getCurrentInstance } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';

interface GlobalProperties {
    $$refs: any;
    $route: RouteLocationNormalizedLoaded; // 当前路由信息
    $router: Router; // 路由实例
}

export const useGlobalProperties = () => {
    const globalProperties = getCurrentInstance()!.appContext.config
        .globalProperties as GlobalProperties;

    const registerRef = (el, _vid: string) => el && (globalProperties.$$refs[_vid] = el);

    return {
        globalProperties,
        registerRef,
    };
};
