# This is a component library in vue3.0 ant-design-vue secondary packaging

# use

    shims-vue.d.ts
        declare module 'canna-ui-vue'

    main.ts
        import { createApp } from 'vue'
        import App from './App.vue'
        import router from './router'
        import Antd from 'ant-design-vue'
        import 'ant-design-vue/dist/antd.css'
        import CannaUI from 'canna-ui-vue'
        import 'canna-ui-vue/dist/style.css'

        const app = createApp(App)
        app.use(router)
        app.use(Antd)
        app.use(CannaUI)
        app.mount('#app')


    App.vue
        <canna-layout
            :menuList="menuList"
            logoSmall="https://cdn.ingeek.com/aladdin/logo-small.png"
            logoDark="https://cdn.ingeek.com/aladdin/logo-dark.png"
        >
            <template v-slot:right>
            <div style="height: 100%; padding: 0 20px">
                <a-avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />leo
            </div>
            </template>
            <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
            </router-view>
        </canna-layout>

    menuList.js
        const menuList = [
            {
                name: "首页",
                path: "/outline-web/home",
                icon: "StarOutlined",
                children: [
                    {
                        name: "系统管理",
                        path: "/home/system",
                        icon: "StarOutlined",
                        children: [
                            {
                                name: "用户管理",
                                path: "/home/system/user",
                                icon: "StarOutlined",
                            },
                            {
                                name: "菜单权限管理",
                                path: "/home/system/menu",
                                icon: "StarOutlined",
                            },
                        ],
                    },
                    {
                        name: "表单页面",
                        path: "/home/form",
                        icon: "StarOutlined",
                    },
                ],
            },
            {
                name: "关于",
                path: "/outline-web/about",
                icon: "StarOutlined",
                children: [
                    {
                        name: "我的",
                        path: "/about/my",
                        icon: "StarOutlined",
                        children: [
                            {
                                name: "自我",
                                path: "/about/my/own",
                                icon: "StarOutlined",
                            },
                            {
                                name: "团队",
                                path: "/about/my/team",
                                icon: "StarOutlined",
                            },
                            {
                                name: "公司",
                                path: "/about/my/company",
                                icon: "StarOutlined",
                            }
                        ]
                    },
                    {
                        name: "文化",
                        path: "/about/culture",
                        icon: "StarOutlined",
                    }
                ]
            },
            {
                name: "内容管理",
                path: "/outline-web/contentManagement",
                icon: "StarOutlined",
            },
            {
                name: "用户管理",
                path: "/outline-web/userManagement",
                icon: "StarOutlined",
            },
            {
                name: "统计分析",
                path: "/outline-web/statisticalAnalysis",
                icon: "StarOutlined",
            }
        ];

        export default menuList;


# release

    npm publish