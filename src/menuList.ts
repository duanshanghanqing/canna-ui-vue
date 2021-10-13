const menuList = [
    {
        name: "首页",
        path: "/canna-web/home",
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
        path: "/canna-web/about",
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
        path: "/canna-web/contentManagement",
        icon: "StarOutlined",
    },
    {
        name: "用户管理",
        path: "/canna-web/userManagement",
        icon: "StarOutlined",
    },
    {
        name: "统计分析",
        path: "/canna-web/statisticalAnalysis",
        icon: "StarOutlined",
    }
];

export default menuList;
