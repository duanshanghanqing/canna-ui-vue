import type { App } from "vue";
import Layout from "./layout";
import Button from "./button";
const components: any[] = [Layout, Button];

// 注册全部组件
const install = (app: App) => {
  // 注册每个组件
  components.forEach((component) => {
    if (component.install) {
      app.use(component);
    }
  });
};

// 一个插件语法
export default {
  install,
};