import type { App } from "vue";
import Button from "./index.vue";

(Button as any).install = function (app: App) {
  app.component(Button.name, Button);
};

export { Button };

export default Button;
