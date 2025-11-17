<script setup lang="ts">
import { LogLineAdapter } from '../adapters/log';

import { computed, watch } from 'vue';
import 'vue-console-feed/style.css';

import { Console, DataAPI } from 'vue-console-feed';
import { useSettings } from '../settings/useSettings';
import { useDark } from '@vueuse/core';

const isDark = useDark();

const props = defineProps<{
  logLines: LogLineAdapter[];
}>();

const settings = useSettings();
const outputConsole = new DataAPI(false, 0);

const clearLogs = () => {
  outputConsole.clear();
};

watch(
  () => props.logLines,
  () => {
    if (settings.value.isClearConsoleOnRun) {
      outputConsole.clear();
    }
    props.logLines.forEach((logLine) => {
      outputConsole[logLine.type](
        ...logLine.messages.map((log) => log.message),
      );
    });
  },
  {
    immediate: true,
  },
);
</script>

<template>
  <div>
    <Console
      :data="outputConsole.value"
      :class="isDark ? '' : 'console-colors--light'"
    >
      <template #anchor> </template>
    </Console>
  </div>
  <button
    type="button"
    class="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/90 text-white shadow-lg backdrop-blur transition hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
    aria-label="Очистить логи"
    @click="clearLogs"
  >
    <i class="pi pi-trash text-lg" />
  </button>
</template>

<style scoped>
.console-colors--light:deep(.console-colors) {
  --c-triangle-fill: #5f6368;
  --c-border: #dadce0;
  --c-bg: #ffffff;
  --c-text: #1f1f1f;
  --c-anchor: #5f6368;
  --c-bg-warn: #fff6e5;
  --c-bg-error: #ffeceb;
  --c-badge: #0b74de;
  --c-badge-warn: #f29f05;
  --c-badge-error: #e93f3b;
  --c-border-warn: #f2d397;
  --c-border-error: #f3b5b3;
  --c-border-table: #e0e0e0;
  --c-text-warn: #a35b00;
  --c-text-debug: #1e6af6;
  --c-text-error: #d93025;
  --c-bg-table-2np1: #f5f5f5;
  --c-text-number: #7b4dd3;
  --c-text-bint: #657049;
  --c-text-size: #8a8d91;
  --c-text-string: #00897b;
  --c-text-char-f: #c77400;
  --c-text-propName: #0d7e8a;
  --c-text-proto: #5f6368;
  --c-text-propHidden: #2f6f91;
  --c-text-two-dot: #1f1f1f;
  --c-el-tag: #0b74de;
  --c-el-attr-key: #3b8480;
  --c-el-attr-val: #c05621;
  --c-el-comment: #8a6d3b;
  --c-el-doctype: #6b7280;
}
</style>
