import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

// 1. 创建 axios 实例
const commonConfig = {
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
};

const baseURL = import.meta.env.VITE_API_BASE_URL || '';

// 创建前台（App）实例：基础路径为 /api
const appRequest: AxiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  ...commonConfig,
});

// 创建后台（Admin）实例：基础路径为 /api/admin
const adminRequest: AxiosInstance = axios.create({
  baseURL: `${baseURL}/api/admin`,
  ...commonConfig,
});

function setupInterceptors(instance: AxiosInstance) {
  // 请求拦截器
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // 响应拦截器
  instance.interceptors.response.use(
    (response) => response.data, // 只返回 data
    (error) => {
      // 统一处理 401
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        // 跳转登录页（需引入 router）
        // router.push('/login');
      }
      // 提取错误信息
      const message =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        error.message ||
        '请求失败';
      return Promise.reject({ status: error.response?.status, message });
    }
  );
}

setupInterceptors(appRequest);
setupInterceptors(adminRequest);

export { appRequest, adminRequest };

// // 2. 请求拦截器
// service.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token')
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// // 3. 响应拦截器
// service.interceptors.response.use(
//   (response) => {
//     return response.data
//   },
//   (error) => {
//     // 1. 统一处理 401 无权限
//     if (error.response?.status === 401) {
//       // 清空 token 并跳转到登录页
//       localStorage.removeItem('token')
//       // 注意：如果当前路由不是登录页，执行跳转（需引入 router）
//       // router.push('/login');
//     }

//     // 2. 提取后端返回的错误信息（后端通常会在响应体里放错误详情）
//     // 例如：{ message: '用户名或密码错误' }
//     const errorMessage =
//       error.response?.data?.message ||
//       error.response?.data?.msg ||
//       error.message ||
//       '请求失败，请稍后重试'

//     // 3. 可以在这里调用全局的消息提示组件（如 Element Plus 的 ElMessage）
//     // ElMessage.error(errorMessage);

//     // 4. 将错误继续抛出，让调用方（useRequest 或组件）也能捕获处理
//     return Promise.reject({
//       status: error.response?.status,
//       message: errorMessage,
//       originalError: error, // 可选：保留原始错误对象用于调试
//     })
//   },
// )
