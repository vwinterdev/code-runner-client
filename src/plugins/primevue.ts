import type { App } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import Tooltip from 'primevue/tooltip';

import 'primeicons/primeicons.css';

export default {
  install: (app: App) => {
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        },
      },
    });

    app.directive('tooltip', Tooltip);
  },
};
