import { useQuery } from '@tanstack/vue-query';
import { API_URL } from '../config/vars';
import axios from 'axios';
import { LogLineAdapter } from '../adapters/log';
import type { ComputedRef } from 'vue';
import { keepPreviousData } from '@tanstack/vue-query';
import { computed } from 'vue';
import { codeKeysFactory } from './keys';

export const codeService = () => {
  const useRunCodeQuery = (
    code: ComputedRef<string>,
    isEnabled: ComputedRef<boolean>,
  ) => {
    return useQuery<LogLineAdapter[]>({
      queryKey: computed(() => codeKeysFactory.runCode(code.value)),
      queryFn: async ({ signal }) => {
        const response = await axios.post(
          `${API_URL}/code/run`,
          { code: code.value },
          { signal, timeout: 50000 },
        );
        return (response.data?.logs || []).map(LogLineAdapter.fromRaw);
      },
      placeholderData: keepPreviousData,
      enabled: computed(() => isEnabled.value),
    });
  };

  return {
    useRunCodeQuery,
  };
};
