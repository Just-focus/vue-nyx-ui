import { withInstall } from "@nyx-plus/utils";
import Button from "./src/index.vue";

// 提供按需加载的方式
export const NlButton = withInstall(Button);
// 导出组件
export default NlButton;
