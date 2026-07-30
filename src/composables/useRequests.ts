import { ref, type Ref } from 'vue';
import request from '@/utils/axios/request.ts'; // 导入封装的 axios 实例
import type { UseRequestOptions, UseRequestReturn } from '@/types/composables/useRequests.ts';

/**
 * 通用的 API 请求 Hook
 * @param apiMethod 返回 Promise 的请求函数
 * @param options 配置项
 * @returns 响应式数据、加载状态、错误信息和执行函数
 */
export function useRequest<T, Args extends any[] = any[]>(
  apiMethod: (...args: Args) => Promise<T>,
  options: UseRequestOptions & { defaultParams?: Args } = {}
): UseRequestReturn<T, Args> {
  const { immediate = true, defaultParams } = options;


  const data = ref<T | null>(null) as Ref<T | null>;
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 执行请求的函数
  const execute = async (...args: Args): Promise<T> => {
    loading.value = true;
    error.value = null;
    try {
      const result = await apiMethod(...args);
      data.value = result;
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      error.value = message || '请求失败';
      console.error('API Error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // 如果配置为立即执行，则调用 execute
  if (immediate) {
    if (defaultParams !== undefined) {
      execute(...defaultParams);
    } else {
      // 无参数调用，适用于 Args 为空元组或全部可选的情况
      // 若 Args 非空且无默认参数，运行时将报错，请确保使用正确
      (execute as any)();
    }
  }

  return {
    data,
    loading,
    error,
    execute,
  };
}