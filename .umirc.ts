import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/', 
      component: '@/layout/index',
      //定义子路由
      routes: [
        {
          path: '/',
          redirect: '/course'
        },
        {
          path: "/course",
          component: "./Course"
        },
        {
          path: "/about",
          component: "./About"
        }
      ],
    }
  ],
});
