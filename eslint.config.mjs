import { defineConfig } from 'eslint/config';

import { adminTeamConfigV1 } from '@vwinterdev/eslint-config/eslint';

export default defineConfig([
  { ignores: ['dist/**', 'coverage/**'] },
  ...adminTeamConfigV1,
]);