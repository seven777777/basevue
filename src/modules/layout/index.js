import Menu from './Menu.vue';
import {
    mapState,
    mapActions
} from 'vuex';
import _ from 'lodash';

export default {
    components: {
        Menu
    },
    data() {
        return {
            openMenus: [], //默认打开的菜单数组
            menu: [{
                    sname: "主页",
                    path: "/",
                    icon: "",
                    children: [{
                            sname: "测试",
                            path: "/index",
                            icon: "",

                        }

                    ]
                },
                {
                    sname: "地图",
                    path: "/maps",
                    icon: "",
                    children: [{
                        sname: "111",
                        path: "/map",
                        icon: "",
                    }]

                },
                {
                    sname: "组件测试",
                    path: "/test",
                    icon: "",
                    children: [{
                            sname: "华鹏测试",
                            path: "/test/huapeng",
                            icon: "",
                        },
                        {
                            sname: "董瑞测试",
                            path: "/test/dongrui",
                            icon: "",
                        },
                        {
                            sname: "韦明瑞测试",
                            path: "/test/weimingrui",
                            icon: "",
                        },
                    ]

                }
            ], //menu_end


            options: [{
                value: 'red',
                label: '红色'
            }, {
                value: 'dark',
                label: '黑色'
            }],


        }
    },
    mounted() {

        let openMenus = this.getDefaultOpenMenus(this.$route.path);
        this.openMenus = openMenus;
        let item = _.find(this.menu, menu => {
            return menu.path == this.$route.path;
        });
        if (item) {
            this.getChildsPath(item);
        }


    },

    computed: {

        theme: {
            get() {
                return this.$store.state.GlobalStore.theme;
            },
            set(value) {
                this.$store.commit("GlobalStore/setTheme", value);
            }
        },


    },
    methods: {
        //切换主题
        changeTheme(value) {

            localStorage.setItem('theme', value);
            window.location.reload();
        },
        //跳转事件
        goToUrl(item) {
            if (!item.children || item.children.length == 0) {
                this.$router.push(item.path);
            }
            let index = this.openMenus.indexOf(item.path);
            if (index != -1 && item.children) {
                this.openMenus.splice(index, 1);
                return;
            }

            this.openMenus = [];
            let openMenus = this.getDefaultOpenMenus(item.path);
            this.openMenus = openMenus;
            if (!this.openMenus.includes(item.path)) {
                this.openMenus.push(item.path);
            }

            this.getChildsPath(item);

        },
        //获取子孙path
        getChildsPath(data) {
            if (data.children) {
                data.children.forEach(menu => {
                    if (!this.openMenus.includes(menu.path)) {
                        this.openMenus.push(menu.path);
                    }

                    this.getChildsPath(menu);
                });
            }
        },
        //获取父path集合
        getDefaultOpenMenus(currentPath) {

            let openMenus = [];
            openMenus.push(currentPath);
            let copyData = this.menu;
            let getTrue = data => {
                data.forEach(item => {

                    if (item.children) {
                        item.children.forEach(itm => {

                            if (itm.path == currentPath) {
                                openMenus.push(item.path);
                                currentPath = item.path;
                                getTrue(copyData);
                            } else {
                                getTrue(item.children);
                            }
                        });
                    };

                });
            };

            getTrue(copyData);

            return openMenus;


        },
        //是否active的菜单
        canOpen(item) {
            return this.openMenus.includes(item.path);
        }
    }



}