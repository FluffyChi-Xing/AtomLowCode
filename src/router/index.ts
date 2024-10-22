import {createRouter, createWebHashHistory} from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component: () => import('@/Layout/default.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            title: '原子低码'
          },
          component: () => import('@/views/Home/index.vue')
        }
      ]
    },
    {
      path: '/atom',
      name: 'atom',
      meta: {
        title: '原子低码'
      },
      component: () => import('@/views/Atom/index.vue'),
      children: [
        {
          path: '',
          name: '链接中心',
            meta: {
                title: '链接中心'
            },
          component: () => import('@/views/Atom/RoutePotal/index.vue')
        },
        {
          path: '/atom/visualEditor',
          name: 'visualEditor',
          meta: {
            title: '低代码引擎'
          },
          component: () => import('@/views/VisualEditor/index.vue')
        },
        {
          path: '/atom/materialCreate',
          name: 'materialCreate',
          meta: {
            title: '鸿蒙造物'
          },
          component: () => import('@/views/MaterialCreatement/index.vue'),
          children: [
            {
              path: '',
              name: 'materialCenter',
              meta: {
                title: '物料中心'
              },
              component: () => import('@/views/MaterialCreatement/_components/MaterialCenter.vue')
            },
            {
              path: '/atom/materialCreate/document',
              name: 'document',
              meta: {
                title: '文档中心'
              },
              component: () => import('@/views/MaterialCreatement/DocumentCenter.vue')
            },
            {
              path: '/atom/materialCreate/workspace:name&:label',
              name: 'workspace',
              meta: {
                title: '工作台'
              },
              component: () => import('@/views/MaterialCreatement/WorkSpace.vue')
            }
          ]
        }
      ]
    }
  ]
})


// before each
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = String(to.meta.title)
  }
  // 处理首页重定向
  if (to.path === '/') return '/home'
  NProgress.start()
})

// after each
router.afterEach(() => {
  NProgress.done()
})
export default router
