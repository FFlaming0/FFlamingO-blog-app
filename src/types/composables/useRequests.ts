import type { Ref } from 'vue'

// 定义选项接口
interface UseRequestOptions {
  immediate?: boolean // 是否立即执行
}

// 定义返回值类型（使用泛型 T 表示 API 返回的数据类型，Args 表示请求函数的参数类型）
interface UseRequestReturn<T, Args extends any[]> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
  execute: (...args: Args) => Promise<T>
}

export type { UseRequestOptions, UseRequestReturn }
