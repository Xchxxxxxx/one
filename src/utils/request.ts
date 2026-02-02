import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage, ElLoading } from "element-plus";

// 创建请求实例的核心函数
export default function() {
  const router = useRouter();
  
  // 加载动画实例
  let loadingInstance: any = null;

 
  const baseURL ="https://e-commercesystem2-production.up.railway.app";

  // 创建axios实例
  const request = axios.create({
    baseURL: baseURL, // 改用环境适配的baseURL
    withCredentials: true,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  });
  const uploadRequest = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  timeout: 10000,
  headers: {'Content-Type': 'multipart/form-data'} 
});
  // ========== 请求拦截器（逻辑不变，仅优化加载动画） ==========
  request.interceptors.request.use(
    (config) => {
      // 避免重复创建加载动画
      if (!loadingInstance) {
        loadingInstance = ElLoading.service({
          lock: true,
          text: '加载中...',
          background: 'rgba(0, 0, 0, 0.1)'
        });
      }

      // 自定义token过期判断逻辑
      const isTokenInvalid = () => {
        const token:any = localStorage.getItem("token");
        if (!token) return true;
        
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const expTime = payload.exp * 1000;
          return Date.now() > expTime;
        } catch (e) {
          return true;
        }
      };

      // 添加token到请求头（仅token有效时）
      const token = localStorage.getItem("token");
      if (token && !isTokenInvalid()) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      loadingInstance?.close();
      loadingInstance = null; // 重置实例
      ElMessage.error(`请求配置异常：${error.message}`);
      return Promise.reject(error);
    }
  );

  // ========== 响应拦截器（优化错误处理 + 重置加载动画） ==========
  request.interceptors.response.use(
    (response) => {
      loadingInstance?.close();
      loadingInstance = null; // 重置实例
      console.log(response)
      const { status } = response;
      // 登录过期（203状态码）处理
      if (status === 203) {
        ElMessage.error("登录已过期，请重新登录");
        localStorage.removeItem("token");
        router.push("/login");
      }
      // 无权限（403状态码）提示
      if (status === 403) {
        ElMessage.warning("暂无权限访问该资源");
      }

      return response;
    },
    (error) => {
      loadingInstance?.close();
      loadingInstance = null; // 重置实例

      // 处理网络错误（无响应）
      if (!error.response) {
        // 区分跨域错误和纯网络错误
        if (error.message.includes("CORS")) {
          ElMessage.error("跨域配置异常，请检查后端CORS或前端代理");
        } else {
          ElMessage.error("网络异常，请检查网络连接");
        }
        return Promise.reject(error);
      }

      // 处理HTTP状态码
      const { status, data } = error.response;
      switch (status) {
        case 401:
          ElMessage.error("登录已过期，请重新登录");
          localStorage.removeItem("token");
          router.push("/login");
          break;
        case 403:
          ElMessage.warning("没有权限执行该操作");
          break;
        case 404:
          ElMessage.warning("请求的资源不存在");
          // 避免重复跳转404
          if (router.currentRoute.value.path !== "/404") {
            router.push("/404");
          }
          break;
        case 500:
          ElMessage.error("服务器内部错误，请稍后重试");
          break;
        default:
          const errMsg = data?.message || data || `请求失败（状态码：${status}）`;
          ElMessage.error(errMsg);
      }

      return Promise.reject(error);
    }
  );

  return { request, uploadRequest };
}