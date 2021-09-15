# This is a component library in vue3.0 ant-design-vue secondary packaging

## use
    main.ts
        import { createApp } from 'vue'
        import App from './App.vue'
        import router from './router'
        import Antd from 'ant-design-vue'
        import 'ant-design-vue/dist/antd.css'
        import Canna from 'canna-ui-vue'
        import 'canna-ui-vue/dist/style.css'

        const app = createApp(App)
        app.use(router)
        app.use(Antd)
        app.use(Canna)
        app.mount('#app')


    App.vue
        <ingeek-layout :menuList="menuList" logoSmall="/logo-small.png" logoDark="/logo-dark.png">
            <template v-slot:right>
                <div style="height: 100%; padding: 0 20px">
                    <a-avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>
                    leo
                </div>
            </template>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </ingeek-layout>

    menuList.js
        const menuList = [
            {
                name: "home",
                path: "/home",
                icon: "StarOutlined",
                children: [
                    {
                        name: "system",
                        path: "/home/system",
                        icon: "StarOutlined",
                        children: [
                            {
                                name: "user",
                                path: "/home/system/user",
                                icon: "StarOutlined",
                            },
                            {
                                name: "menu",
                                path: "/home/system/menu",
                                icon: "StarOutlined",
                            },
                        ],
                    },
                    {
                        name: "form",
                        path: "/home/form",
                        icon: "StarOutlined",
                    },
                ],
            },
            {
                name: "about",
                path: "/about",
                icon: "StarOutlined",
                children: [
                    {
                        name: "my",
                        path: "/about/my",
                        icon: "StarOutlined",
                        children: [
                            {
                                name: "own",
                                path: "/about/my/own",
                                icon: "StarOutlined",
                            },
                            {
                                name: "team",
                                path: "/about/my/team",
                                icon: "StarOutlined",
                            },
                            {
                                name: "company",
                                path: "/about/my/company",
                                icon: "StarOutlined",
                            }
                        ]
                    },
                    {
                        name: "culture",
                        path: "/about/culture",
                        icon: "StarOutlined",
                    }
                ]
            },
        ];

        export default menuList;