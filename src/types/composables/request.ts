import type { Ref } from 'vue'

// 定义选项接口
interface RequestOptions<Args extends any[]> {
  immediate?: boolean;          // 是否立即执行
  defaultParams?: Args;         // 默认参数
  onError?: (err: unknown) => void; // 可选的自定义错误处理，覆盖全局
}

// 定义返回值类型（使用泛型 T 表示 API 返回的数据类型，Args 表示请求函数的参数类型）
interface RequestReturn<T, Args extends any[]> {
  data: Ref<T | null>
  loading: Ref<boolean>
  execute: (...args: Args) => Promise<T | undefined>;
}

export type { RequestOptions, RequestReturn }
