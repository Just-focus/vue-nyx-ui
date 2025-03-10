<template>
  <div class="margin-bottom-16">
    <a-button :loading="loading">默认的</a-button>
    <a-button type="primary" :loading="loading">主要</a-button>
    <a-button type="success" :loading="loading">成功</a-button>
    <a-button type="warning" :loading="loading">警告</a-button>
    <a-button type="error" :loading="loading">错误</a-button>
  </div>
  <div>
    <a-button :before-change="handleAsync" size="small">异步加载</a-button>
    <a-button :before-change="handleAsync">异步加载</a-button>
    <a-button :before-change="handleAsync" size="large">异步加载</a-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
// ref
const loading = ref(true);

/**
 * 异步
 */
const handleAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
};
</script>
