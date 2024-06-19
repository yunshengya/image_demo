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
        path: '', // 默认页不需要再次指定 RouterEnum.Index
        redirect: RouterEnum.User,
      },
      {
        name: '用户',
        path: RouterEnum.User,
        component: () => import('@/pages/content/user/user.vue'),
        children: [
          {
            name: '图片',
            path: RouterEnum.UserImage,
            component: () => import('@/pages/content/user/image/image.vue')
          }
        ]
      },
      {
        name: '视频',
        path: RouterEnum.Video,
        component: () => import('@/pages/content/video/video.vue')
      },
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
  console.error('Router error:', error, 'to:', to);

  // 检查是否是动态导入模块失败的错误
  // if (error.message.includes('Failed to fetch dynamically imported module')) {
  //   // 使用 router.push() 导航到错误页面
  //   router.push('/404'); // 可以根据实际的路由配置来替换成对应的错误页面路径
  // }
});

export default router;