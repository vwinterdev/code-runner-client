<script setup lang="ts">
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import { shallowRef } from 'vue';
import { useSettings } from '../settings/useSettings';
import type { SplitterResizeEndEvent } from 'primevue';

const isResizing = shallowRef(true);
const settings = useSettings();

const onResize = () => {
    isResizing.value = false;
    document.body.style.userSelect = 'none';
}

const onResizeEnd = (e: SplitterResizeEndEvent) => {
    isResizing.value = true;
    document.body.style.userSelect = 'auto';
    settings.value.panelSize.left = e.sizes[0] ?? 50;
    settings.value.panelSize.right = e.sizes[1] ?? 50;
}

const onResizeStart = () => {
    isResizing.value = false;
    document.body.style.userSelect = 'none';
}
</script>

<template>
    <Splitter @resize="onResize" @resizeend="onResizeEnd" @resizestart="onResizeStart">
        <SplitterPanel :minSize="40" v-model:size="settings.panelSize.left" :class="{'overflow-visible!': isResizing}">
            <slot name="left" />
        </SplitterPanel>
        <SplitterPanel :minSize="10" v-model:size="settings.panelSize.right">
            <slot name="right" />
        </SplitterPanel>
    </Splitter>
</template>
