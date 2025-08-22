/**
 * 认证工具函数
 * 提供便捷的 token 管理功能
 */

import { 
  setToken, 
  clearToken, 
  getCurrentToken, 
  hasValidToken 
} from "../interceptors/TokenInterceptor";

// 重新导出 TokenInterceptor 的工具函数
export { 
  setToken, 
  clearToken, 
  getCurrentToken, 
  hasValidToken 
};

/**
 * 用户登录后设置认证 token
 * @param token - 认证 token
 * @param remember - 是否长期记住（可选，用于未来扩展）
 */
export function login(token: string, remember: boolean = true): void {
  setToken(token);
  console.info("User logged in successfully");
}

/**
 * 用户登出，清除所有认证信息
 */
export function logout(): void {
  clearToken();
  // 这里可以添加其他登出逻辑，如：
  // - 清除用户信息
  // - 重定向到登录页
  // - 清除其他缓存数据
  console.info("User logged out successfully");
}

/**
 * 检查用户是否已登录
 * @returns boolean
 */
export function isAuthenticated(): boolean {
  return hasValidToken();
}

/**
 * 获取当前用户的 token（用于调试或特殊场景）
 * @returns string | null
 */
export function getAuthToken(): string | null {
  return getCurrentToken();
}