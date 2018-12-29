const Layout = () => import( /* webpackChunkName: "layout" */ '@/modules/layout/index.vue');
const Index = () => import( /* webpackChunkName: "index" */ '@/modules/index/index.vue');
const Map = () => import( /* webpackChunkName: "map" */ '@/modules/map/index.vue');


//测试模块路由
const HuapengCompTest = () => import( /* webpackChunkName: "map" */ '@/modules/compTest/huapeng/index.vue');
const dongruiCompTest = () => import( /* webpackChunkName: "map" */ '@/modules/compTest/dongrui/index.vue');
const weimingruiCompTest = () => import( /* webpackChunkName: "map" */ '@/modules/compTest/weimingrui/index.vue');
//测试模块路由end

export default [{
    sname: "首页",
    path: '/',
    component: Layout,
    children: [{
      path: '/index',
      component: Index,
      sname: "首页",

    }, ]
  },
  {
    sname: "地图",
    path: '/map',
    component: Layout,
    children: [{
      path: '/map',
      component: Map,
      sname: "地图",

    }, ]

  },
  {
    sname: "模块测试",
    path: '/test',
    component: Layout,
    children: [{
        path: '/test/huapeng',
        component: HuapengCompTest,
        sname: "华鹏测试",

      },
      {
        path: '/test/dongrui',
        component: dongruiCompTest,
        sname: "董瑞测试",

      },
      {
        path: '/test/weimingrui',
        component: weimingruiCompTest,
        sname: "韦明瑞测试",

      },
    ]

  }

];