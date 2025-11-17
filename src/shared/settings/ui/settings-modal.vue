<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { useSettings } from '../useSettings';
import { shallowRef, watch } from 'vue';
import Select from 'primevue/select';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import ToggleSwitch from 'primevue/toggleswitch';
import Divider from 'primevue/divider';
import { useDark } from '@vueuse/core';

const settings = useSettings();
const visible = shallowRef(false);

const openModal = () => {
  visible.value = true;
};

const themes = [
  { label: '🌞 Light', value: 'light' },
  { label: '🌙 Dark', value: 'dark' },
];

const isDark = useDark();

watch(
  () => settings.value.theme,
  (newVal) => {
    isDark.value = newVal === 'dark';
  },
);

type ToggleOption = {
  id: string;
  label: string;
  description: string;
  getValue: () => boolean;
  setValue: (value: boolean) => void;
};

const toggleOptions: ToggleOption[] = [
  {
    id: 'isEnabledAutoRun',
    label: 'Автоматически запускать код',
    description: 'Код будет запускаться в фоновом режиме',
    getValue: () => settings.value.isEnabledAutoRun,
    setValue: (value) => {
      settings.value.isEnabledAutoRun = value;
    },
  },
  {
    id: 'isClearConsoleOnRun',
    label: 'Очищать консоль при запуске',
    description: 'Очищать консоль при каждом запуске кода',
    getValue: () => settings.value.isClearConsoleOnRun,
    setValue: (value) => {
      settings.value.isClearConsoleOnRun = value;
    },
  },
  {
    id: 'minimap',
    label: 'Мини-карта',
    description: 'Показывать мини-карту кода',
    getValue: () => settings.value.minimap.enabled,
    setValue: (value) => {
      settings.value.minimap.enabled = value;
    },
  },
  {
    id: 'automaticLayout',
    label: 'Автоматический размер',
    description: 'Автоматически подстраивать размер редактора',
    getValue: () => settings.value.automaticLayout,
    setValue: (value) => {
      settings.value.automaticLayout = value;
    },
  },
];
</script>

<template>
  <div @click="openModal">
    <slot name="trigger">
      <Button label="Show" />
    </slot>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    header="Настройки редактора"
    :style="{ width: '28rem' }"
  >
    <div class="flex flex-col gap-4 select-none">
      <!-- Theme Section -->
      <div class="flex flex-col gap-2">
        <label
          class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
        >
          <i class="pi pi-palette text-sm"></i>
          Тема оформления
        </label>
        <Select
          v-model="settings.theme"
          :options="themes"
          optionLabel="label"
          optionValue="value"
          placeholder="Выберите тему"
          class="w-full"
        />
      </div>

      <Divider />

      <div class="flex flex-col gap-2">
        <label
          class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
        >
          <i class="pi pi-text-height text-sm"></i>
          Размер шрифта
        </label>
        <div class="flex items-center gap-3">
          <InputNumber
            v-model="settings.fontSize"
            mode="decimal"
            showButtons
            :min="10"
            :max="25"
            :step="1"
            class="flex-1"
          />
          <span class="text-sm text-gray-500 dark:text-gray-400 min-w-[3rem]">
            {{ settings.fontSize }}px
          </span>
        </div>
      </div>

      <Divider />

      <!-- Editor Options Section -->
      <div class="flex flex-col gap-3">
        <label
          class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
        >
          <i class="pi pi-cog text-sm"></i>
          Параметры редактора
        </label>

        <div class="flex flex-col gap-3 pl-2">
          <template v-for="option in toggleOptions" :key="option.id">
            <div class="flex items-center justify-between gap-4">
              <div class="flex flex-col gap-1 flex-1">
                <label
                  :for="option.id"
                  class="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
                >
                  {{ option.label }}
                </label>
                <span class="text-xs text-gray-500 dark:text-gray-500">
                  {{ option.description }}
                </span>
              </div>
              <ToggleSwitch
                :model-value="option.getValue()"
                :id="option.id"
                @update:modelValue="option.setValue"
              />
            </div>
          </template>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <Button
          label="Закрыть"
          severity="secondary"
          @click="visible = false"
          class="w-full"
        />
      </div>
    </template>
  </Dialog>
</template>

<style scoped>
:deep(.p-dialog-header) {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--p-surface-border);
}

:deep(.p-dialog-content) {
  padding: 1.5rem;
}

:deep(.p-dialog-footer) {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--p-surface-border);
}
</style>
