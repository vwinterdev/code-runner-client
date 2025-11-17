

<script setup lang="ts">
import { LogLineAdapter } from '../adapters/log';

import { watch } from 'vue';
import "vue-console-feed/style.css"

import { Console, DataAPI } from "vue-console-feed"
import { useSettings } from '../settings/useSettings';

const props = defineProps<{
    logLines: LogLineAdapter[];
}>()

const settings = useSettings();
const outputConsole = new DataAPI(false, 0)

watch(() => props.logLines, () => {
    if (settings.value.isClearConsoleOnRun) {
        outputConsole.clear()
    }
    props.logLines.forEach(logLine => {
        outputConsole[logLine.type](...logLine.messages.map(log => log.message))
    })
})

</script>

<template>
    <Console :data="outputConsole.value" :variant="settings.theme" >
        <template #anchor>    
        </template>
    </Console>
</template>

