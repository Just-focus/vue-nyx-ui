<template>
  <div class="examples-container">
    <template v-if="isSource">
      <!-- 描述 -->
      <div class="description"><slot name="description" /></div>
      <!-- 演示主体 -->
      <div class="examples-body" :class="{ 'show-source': source }">
        <!-- 组件渲染 -->
        <div class="examples-inner"><component :is="demo" /></div>
        <!-- 控制元素 -->
        <ul class="examples-control">
          <li @click="copy" @mouseleave="isCopySuccess = ''">
            <label class="icon-popup-label">{{ iconCopy.text }}代码</label>
            <i class="iconfont" :class="iconCopy.icon"></i>
          </li>
          <li @click="toggleSource">
            <label class="icon-popup-label"
              >{{ source ? "收起" : "显示" }}代码</label
            >
            <i class="iconfont icon-daima"></i>
          </li>
        </ul>
        <!-- 组件源码 -->
        <div v-if="source" ref="sourceRef" class="source-inner">
          <slot name="source" />
        </div>
      </div>
    </template>
    <template v-else><component :is="demo" /></template>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, useSlots, nextTick } from "vue";
import modules from "../../components";
import Clipboard from "clipboard";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.min.css";

const slots = useSlots();
const props = defineProps({
  path: {
    type: String,
    default: "",
  },
});

const source = ref(false);
const sourceRef = ref(null);
const isCopySuccess = ref("");

const demo = computed(() => {
  const key = `examples/${props.path}.vue`;
  return modules[key];
});

const iconCopy = computed(() => {
  if (isCopySuccess.value === true) {
    return {
      icon: "icon-chenggong1",
      text: "成功",
    };
  }
  if (isCopySuccess.value === false) {
    return {
      icon: "icon-chahao",
      text: "失败",
    };
  }
  return {
    icon: "icon-fuzhi_line",
    text: "复制",
  };
});

const copy = async (event) => {
  const clipboard = new Clipboard(event.target, {
    text: () => slots.source()[0]?.children[0]?.children,
  });
  clipboard.on("success", () => {
    isCopySuccess.value = true;
    clipboard.destroy();
  });
  clipboard.on("error", () => {
    isCopySuccess.value = false;
    clipboard.destroy();
  });
  clipboard.onClick(event);
};

const toggleSource = async () => {
  source.value = !source.value;
  await nextTick();
  const children = sourceRef.value;
  source.value && children && prism.highlightAllUnder(children);
};

/** 根据白名单，是否渲染源码 */
const withList = ["icons/system", "icons/arrow"];
const isSource = computed(() => !withList.includes(props.path));

onMounted(() => {});
</script>
<style lang="scss" scoped>
.examples-body {
  border: 1px solid #e4e4e7;
  border-radius: 8px;
}
.examples-inner {
  padding: 24px;
}
.examples-control {
  text-align: center;
  height: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px dashed #e4e4e7;
  margin: 0;
  li {
    position: relative;
    list-style: none;
    width: 35px;
    text-align: center;
    margin-top: 0;
    &:hover {
      .icon-popup-label {
        transform: translateX(-50%) scale(1);
      }
    }
  }
  i {
    opacity: 0.5;
    cursor: pointer;
    transition: all 0.1s ease 0s;
    font-size: 16px;
    &:hover {
      opacity: 1;
      font-size: 17px;
    }
  }
}
.icon-popup-label {
  display: block;
  position: absolute;
  left: 50%;
  bottom: 115%;
  font-size: 14px;
  color: #fff;
  padding: 8px 10px;
  border-radius: 2px;
  transform: translateX(-50%) scale(0);
  transition: 0.1s;
  background-color: rgba(0, 0, 0, 0.7);
  white-space: nowrap;
  line-height: 1;
  &:before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-top: 5px solid rgba(0, 0, 0, 0.7);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
}
</style>
<style lang="scss">
.show-source {
  pre.language-html {
    padding: 12px 20px !important;
  }
  .language-html {
    font-size: 14px;

    border-radius: 0 0 12px 12px;
    background-color: #363449 !important;
  }
}
</style>
