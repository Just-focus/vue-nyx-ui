import { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import UI from "../../../packages";
import Demo from "../components/demo/index.vue";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component("Demo", Demo);
    app.use(UI);
  },
} as Theme;
