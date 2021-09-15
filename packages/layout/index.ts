import type { App } from "vue";
import Layout from "./index.vue";

(Layout as any).install = function (app: App) {
  app.component(Layout.name, Layout);
};

export { Layout };

export default Layout;
