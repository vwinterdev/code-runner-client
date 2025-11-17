<script setup lang="ts">
import { ref, shallowRef, computed } from 'vue';
import { CodeEditor } from 'monaco-editor-vue3';
import SettingsModal from '@shared/settings/ui/settings-modal.vue';
import { useSettings } from '@shared/settings/useSettings';
import { codeService } from '@shared/service/code';
import CodeOutput from '@shared/components/code-output.vue';
import Menubar from 'primevue/menubar';
import Splitter2Part from '@shared/components/splitter-2-part.vue';
import Button from 'primevue/button';
import Logo from '@shared/components/logo.vue';
import { useEventListener } from '@vueuse/core';
import ContextMenu from 'primevue/contextmenu';

const { useRunCodeQuery } = codeService();

const code = ref(`(() => {
  console.log('CodeRunner');
})()`);

const settings = useSettings();

const runCodeQuery = useRunCodeQuery(
  computed(() => code.value),
  computed(() => settings.value.isEnabledAutoRun),
);

const runCode = async () => {
  runCodeQuery.refetch();
};

useEventListener(document, 'keydown', (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 's') {
    event.preventDefault();
    runCode();
  }
});

const contextMenuItems = shallowRef([
  {
    label: 'Run Code',
    icon: 'pi pi-play',
    command: runCode,
  },
]);
</script>

<template>
  <div class="flex flex-col h-screen">
    <Menubar class="border-b">
      <template #start>
        <Logo />
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Button
            label="Run Code"
            icon="pi pi-play"
            :loading="runCodeQuery.isFetching.value"
            :disabled="
              runCodeQuery.isFetching.value || settings.isEnabledAutoRun
            "
            @click="runCode"
            severity="success"
            v-tooltip.top="
              !settings.isEnabledAutoRun
                ? 'Запустить код'
                : 'Автоматический запуск включен'
            "
            size="small"
          />
          <SettingsModal>
            <template #trigger>
              <Button
                icon="pi pi-cog"
                severity="secondary"
                text
                rounded
                size="small"
                aria-label="Settings"
              />
            </template>
          </SettingsModal>
        </div>
      </template>
    </Menubar>
    <Splitter2Part class="h-full">
      <template #left>
        <CodeEditor
          v-model:value="code"
          language="javascript"
          :options="{
            ...settings,
            theme: `vs-${settings.theme}`,
          }"
        />
      </template>
      <template #right>
        <div v-if="runCodeQuery.data.value" class="overflow-auto">
          <CodeOutput :logLines="runCodeQuery.data.value || []" />
        </div>
      </template>
    </Splitter2Part>
    <ContextMenu global :model="contextMenuItems" />
  </div>
</template>
