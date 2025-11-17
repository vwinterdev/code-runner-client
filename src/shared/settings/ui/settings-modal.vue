<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { useSettings } from '../useSettings';
import { shallowRef } from 'vue';
import Select from 'primevue/select';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import ToggleSwitch from 'primevue/toggleswitch';
import Divider from 'primevue/divider';

const settings = useSettings();
const visible = shallowRef(false);

const openModal = () => {
  visible.value = true;
};

const themes = [
  { label: '🌞 Light', value: 'light' },
  { label: '🌙 Dark', value: 'dark' },
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
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
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
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
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
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <i class="pi pi-cog text-sm"></i>
          Параметры редактора
        </label>
        
        <div class="flex flex-col gap-3 pl-2">
          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-col gap-1 flex-1">
              <label 
                for="isDisabledAutoRun" 
                class="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                Автоматически запускать код
              </label>
              <span class="text-xs text-gray-500 dark:text-gray-500">
                Код будет запускаться в фоновом режиме
              </span>
            </div>
            <ToggleSwitch 
              v-model="settings.isDisabledAutoRun" 
              id="isDisabledAutoRun"
            />
          </div>
          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-col gap-1 flex-1">
              <label 
                for="isClearConsoleOnRun" 
                class="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                Очищать консоль при запуске
              </label>
              <span class="text-xs text-gray-500 dark:text-gray-500">
                Очищать консоль при каждом запуске кода
              </span>
            </div>
            <ToggleSwitch 
              v-model="settings.isClearConsoleOnRun" 
              id="isClearConsoleOnRun"
            />
          </div>
          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-col gap-1 flex-1">
              <label 
                for="minimap" 
                class="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                Мини-карта
              </label>
              <span class="text-xs text-gray-500 dark:text-gray-500">
                Показывать мини-карту кода
              </span>
            </div>
            <ToggleSwitch 
              v-model="settings.minimap.enabled" 
              id="minimap"
            />
          </div>

          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-col gap-1 flex-1">
              <label 
                for="automaticLayout" 
                class="text-sm text-gray-600 dark:text-gray-400 cursor-pointer"
              >
                Автоматический размер
              </label>
              <span class="text-xs text-gray-500 dark:text-gray-500">
                Автоматически подстраивать размер редактора
              </span>
            </div>
            <ToggleSwitch 
              v-model="settings.automaticLayout" 
              id="automaticLayout"
            />
          </div>
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

