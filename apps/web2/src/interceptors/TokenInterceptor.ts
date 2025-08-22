import { HttpEvent, HttpHandlerFn, HttpRequest } from "@ngify/http";
import { Observable } from "rxjs";

// 定义 Token 配置常量
const TOKEN_STORAGE_KEY = "authToken";
const TOKEN_PREFIX = "Bearer";
const HEADER_AUTHORIZATION = "satoken";

// 需要认证的端点模式
const AUTH_REQUIRED_PATTERNS = ["/api/", "/chat/", "/user/", "/admin/"];

/**
 * Token 拦截器 - 自动在请求头中添加认证 Token
 * 从 localStorage 中获取 token 并添加到 Authorization header
 *
 * @param req - HTTP 请求对象
 * @param next - 下一个处理函数
 * @returns Observable<HttpEvent<unknown>>
 */
export function TokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  try {
    // 检查是否需要添加 token
    if (!shouldAddToken(req)) {
      return next(req);
    }

    // 从 localStorage 获取 token
    const token = getTokenFromStorage();

    // 如果没有 token，直接继续请求
    if (!token) {
      console.warn("TokenInterceptor: No token found in localStorage");
      return next(req);
    }

    // 验证 token 格式
    if (!isValidToken(token)) {
      console.error("TokenInterceptor: Invalid token format");
      removeTokenFromStorage(); // 清除无效 token
      return next(req);
    }

    // 克隆请求并添加 Authorization header
    const authReq = req.clone({
      headers: req.headers.set(HEADER_AUTHORIZATION, `${token}`),
    });

    console.debug("TokenInterceptor: Added token to request", {
      url: authReq.url,
      hasToken: true,
    });

    return next(authReq);
  } catch (error) {
    console.error("TokenInterceptor: Error processing request", error);
    // 发生错误时，继续原始请求
    return next(req);
  }
}

/**
 * 判断请求是否需要添加 token
 * @param req - HTTP 请求对象
 * @returns boolean
 */
function shouldAddToken(req: HttpRequest<unknown>): boolean {
  // 如果已经有 Authorization header，跳过
  if (req.headers.has(HEADER_AUTHORIZATION)) {
    return false;
  }

  // 检查 URL 是否匹配需要认证的模式
  const url = req.url.toLowerCase();
  return AUTH_REQUIRED_PATTERNS.some((pattern) =>
    url.includes(pattern.toLowerCase())
  );
}

/**
 * 从 localStorage 获取 token
 * @returns string | null
 */
function getTokenFromStorage(): string | null {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error(
      "TokenInterceptor: Error reading token from localStorage",
      error
    );
    return null;
  }
}

/**
 * 验证 token 格式是否有效
 * @param token - 待验证的 token
 * @returns boolean
 */
function isValidToken(token: string): boolean {
  // 基本验证：token 不能为空且长度合理
  if (!token || token.trim().length === 0) {
    return false;
  }

  // 简单长度验证（可根据实际 token 格式调整）
  if (token.length < 10) {
    return false;
  }

  // 可以添加更多验证逻辑，如：
  // - JWT 格式验证
  // - token 过期时间检查
  // - token 签名验证等

  return true;
}

/**
 * 从 localStorage 中移除无效的 token
 */
function removeTokenFromStorage(): void {
  try {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    console.info("TokenInterceptor: Invalid token removed from localStorage");
  } catch (error) {
    console.error(
      "TokenInterceptor: Error removing token from localStorage",
      error
    );
  }
}

/**
 * 工具函数：手动设置 token 到 localStorage
 * @param token - 要设置的 token
 */
export function setToken(token: string): void {
  try {
    if (!isValidToken(token)) {
      throw new Error("Invalid token format");
    }
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    console.info("TokenInterceptor: Token saved to localStorage");
  } catch (error) {
    console.error(
      "TokenInterceptor: Error saving token to localStorage",
      error
    );
    throw error;
  }
}

/**
 * 工具函数：清除 token
 */
export function clearToken(): void {
  removeTokenFromStorage();
}

/**
 * 工具函数：获取当前 token
 * @returns string | null
 */
export function getCurrentToken(): string | null {
  return getTokenFromStorage();
}

/**
 * 工具函数：检查是否有有效 token
 * @returns boolean
 */
export function hasValidToken(): boolean {
  const token = getTokenFromStorage();
  return token !== null && isValidToken(token);
}
