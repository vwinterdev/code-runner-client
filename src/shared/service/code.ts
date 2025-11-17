import { useQuery } from '@tanstack/vue-query'
import { API_URL } from '../config/vars'
import axios from 'axios';
import { LogLineAdapter } from '../adapters/log';
import type { ComputedRef } from 'vue';
import { keepPreviousData } from '@tanstack/vue-query';
import { computed } from 'vue';

export const codeService = () => {

    const useRunCodeQuery = (code: ComputedRef<string>, isDisabled: ComputedRef<boolean>) => {
        return useQuery<LogLineAdapter[]>({
            queryKey: computed(() => ['code', 'run', code.value]),
            queryFn: async ({signal}) => {
                const response = await axios.post(`${API_URL}/code/run`, { code: code.value }, { signal, timeout: 50000 })
                return (response.data?.logs || []).map(LogLineAdapter.fromRaw)
            },
            placeholderData: keepPreviousData,
            enabled: computed(() => !isDisabled.value)
        })
    }


    return {
        useRunCodeQuery
    }
}