import { RouteLocationNormalized, RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { RouterEnum } from '@/application/interface/public'
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: RouterEnum.User,
  },
  {
    name: '登录',
    path: RouterEnum.Login,
    component: () => import("@/pages/login.vue")
  },
  {
    name: '首页',
    path: RouterEnum.Index,
    component: () => import("@/pages/index.vue"),
    children: [
      {
        name: '默认页',
        path: RouterEnum.Index,
        redirect: RouterEnum.User,
      },
      // {
      //   path: RouterEnum.Content,
      //   name: '内容',
      //   component: () => import('@/pages/content/index.vue')
      // },
      {
        name: '用户',
        path: RouterEnum.User,
        component: () => import('@/pages/content/user/user.vue'),
        children: [
          {
            name: '图片',
            path: RouterEnum.UserVideo,
            component: () => import('@/pages/content/user/video/video.vue')
          }
        ]
      }
    ]
    // children: [
    //   {
    //     path: RouterEnum.Content,
    //     name: '首页',
    //     redirect: '/',
    //     component: () => import("@/pages/content/index.vue")
    //   },
    //   {
    //     path: RouterEnum.User,
    //     name: '用户',
    //     component: () => import("@/pages/content/user.vue")
    //   }
    // ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/pages/404.vue')
  }
]

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHashHistory(),
  routes,
})


router.beforeEach((_to, _from, next) => {
  next()
})

// 全局路由错误处理
router.onError((error: Error, to: RouteLocationNormalized) => {
  // 检查是否是动态导入模块失败的错误
  if (error.message.includes('Failed to fetch dynamically imported module')) {
    // 如果是，重定向到当前路径
    window.location.href = to.fullPath as string; // 使用类型断言
  }
});




export default router