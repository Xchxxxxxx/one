import { createRouter, createWebHistory } from 'vue-router';
// 关键修正：用 import type 导入路由类型
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/userStore'
// 引入页面组件
import Home from '../views/Home.vue';
import Merchant from '../views/Merchant.vue';
import Solutions from '../views/Solutions.vue';
import HelpCenter from '../views/HelpCenter.vue';
import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/merchant', name: 'Merchant', component: Merchant },
  { path: '/solutions', name: 'Solutions', component: Solutions },
  { path: '/help', name: 'HelpCenter', component: HelpCenter },
  { path: '/usercenter', name: 'UserCenter', component: () => import('@/views/UserCenter.vue') },
  { path: '/appointment', name: 'Appointment', component: () => import('@/views/Appointment.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' } // 404重定向
];

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - 无边商城` : '无边商城'
  
  // 获取用户登录状态
  const userStore = useUserStore()
  const isLogin = userStore.isLogin()
  console.log(localStorage.getItem('token'))
  console.log('导航守卫：isLogin =', isLogin)
  // 白名单：无需登录的页面（也可以用 to.meta.requiresAuth 判断）
  const whiteList = ['/login', '/', '/404']

  // 核心逻辑：
  if (whiteList.includes(to.path)) {
    // 访问白名单页面：直接放行
    next()
  } else {
    if (isLogin) {
      // 已登录：放行
      next()
    } else {
      // 未登录：跳转到登录页，并记录当前页面（登录后可返回）
      userStore.showLogin = true
       next(false) 
    }
  }
})
export default router;