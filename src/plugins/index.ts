import type { App } from 'vue';
import primeVue from './primevue';
import monacoWorker from './monaco-worker';
import vueQuery from './vue-query';

export default {
    install: (app: App) => {
        primeVue.install(app);
        monacoWorker.install();
        vueQuery.install(app);
    }
}