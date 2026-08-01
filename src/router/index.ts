import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/app/home/HomeView.vue'
import PostView from '@/views/PostView.vue'

import type { RouteRecordRaw } from 'vue-router'

// 路由表：每条记录映射一个路径到一个组件
const routes: RouteRecordRaw[] = [
  {
    path: '/', // URL 路径
    name: 'home', // 路由名称（可选，编程式导航时用）
    component: HomeView, // 对应的页面组件
    meta: { layout: 'HomeLayout' },
  },
  {
    // 动态路由：:id 是占位符，匹配任意值
    // /post/1、/post/2、/post/hello 都会匹配到这条
    path: '/test',
    name: 'test',
    // 懒加载：访问时才加载，打包时会拆分出独立的 JS 文件
    component: PostView,
  },
  {
    // 动态路由：:id 是占位符，匹配任意值
    // /post/1、/post/2、/post/hello 都会匹配到这条
    path: '/category/:slug',
    name: 'category',
    // 懒加载：访问时才加载，打包时会拆分出独立的 JS 文件
    component: () => import('@/views/app/category/CategoryView.vue'),
    props: true,
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式（URL 看起来像普通路径）
  routes, // 注册路由表
})

export default router
