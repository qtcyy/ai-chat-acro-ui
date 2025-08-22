# TokenInterceptor 使用文档

## 概述

TokenInterceptor 是一个 HTTP 请求拦截器，用于自动在需要认证的 API 请求中添加 Authorization header。它从 localStorage 中获取 token，并自动处理 token 的验证和错误处理。

## 功能特性

- ✅ 自动从 localStorage 获取 token
- ✅ 智能识别需要认证的请求
- ✅ Bearer token 格式支持
- ✅ Token 格式验证
- ✅ 错误处理和日志记录
- ✅ 自动清理无效 token
- ✅ TypeScript 类型安全

## 配置说明

### 1. Token 存储配置

```typescript
// 默认配置
const TOKEN_STORAGE_KEY = "authToken";     // localStorage 中的 key
const TOKEN_PREFIX = "Bearer";             // Authorization header 前缀
const HEADER_AUTHORIZATION = "Authorization"; // header 名称
```

### 2. 需要认证的端点模式

```typescript
const AUTH_REQUIRED_PATTERNS = [
  "/api/",      // 所有包含 /api/ 的请求
  "/chat/",     // 所有包含 /chat/ 的请求
  "/user/",     // 所有包含 /user/ 的请求
  "/admin/"     // 所有包含 /admin/ 的请求
];
```

> **注意：** 可以根据实际 API 结构修改这些模式

## 使用方法

### 1. 基本集成

TokenInterceptor 已经在 `App.tsx` 中集成：

```typescript
import { TokenInterceptor } from "./interceptors/TokenInterceptor";

// 在 HttpContextProvider 中使用
<HttpContextProvider fnInterceptors={[TokenInterceptor]}>
  {/* 您的应用组件 */}
</HttpContextProvider>
```

### 2. Token 管理

使用 `utils/auth.ts` 中的工具函数：

```typescript
import { login, logout, isAuthenticated, getAuthToken } from "../utils/auth";

// 用户登录时设置 token
login("your-jwt-token-here");

// 检查用户是否已登录
if (isAuthenticated()) {
  console.log("用户已登录");
}

// 用户登出时清除 token
logout();

// 获取当前 token（调试用）
const currentToken = getAuthToken();
```

### 3. 直接使用 TokenInterceptor 的工具函数

```typescript
import { setToken, clearToken, getCurrentToken, hasValidToken } from "./interceptors/TokenInterceptor";

// 设置 token
setToken("your-token");

// 清除 token
clearToken();

// 获取当前 token
const token = getCurrentToken();

// 检查是否有有效 token
const isValid = hasValidToken();
```

## 工作流程

1. **请求拦截**：所有 HTTP 请求都会被 TokenInterceptor 拦截
2. **模式匹配**：检查请求 URL 是否匹配需要认证的模式
3. **Header 检查**：如果已有 Authorization header，跳过处理
4. **Token 获取**：从 localStorage 读取 token
5. **Token 验证**：验证 token 格式是否有效
6. **Header 注入**：将 `Authorization: Bearer <token>` 添加到请求头
7. **请求转发**：将修改后的请求传递给下一个处理器

## 错误处理

### 1. 日志级别

- `console.debug`: Token 添加成功时的调试信息
- `console.warn`: 没有找到 token 时的警告
- `console.error`: Token 格式无效或其他错误
- `console.info`: Token 操作成功的信息

### 2. 错误场景处理

| 场景 | 行为 | 日志 |
|------|------|------|
| 没有 token | 继续请求，不添加 header | Warning |
| Token 格式无效 | 清除 token，继续请求 | Error |
| localStorage 访问失败 | 继续请求，不添加 header | Error |
| 拦截器异常 | 继续原始请求 | Error |

## 自定义配置

### 1. 修改需要认证的端点模式

编辑 `TokenInterceptor.ts` 中的 `AUTH_REQUIRED_PATTERNS`：

```typescript
const AUTH_REQUIRED_PATTERNS = [
  "/api/v1/",           // 特定版本的 API
  "/secure/",           // 安全端点
  "/dashboard/api/",    // 仪表板 API
  // 添加您的自定义模式
];
```

### 2. 自定义 Token 验证逻辑

修改 `isValidToken` 函数：

```typescript
function isValidToken(token: string): boolean {
  // 您的自定义验证逻辑
  // 例如：JWT 格式验证
  if (token.split('.').length !== 3) {
    return false;
  }
  
  // Token 过期检查
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return false;
    }
  } catch {
    return false;
  }
  
  return true;
}
```

### 3. 支持多种认证方案

```typescript
// 可以扩展为支持不同的认证类型
function getAuthHeader(token: string, authType: string = "Bearer"): string {
  switch (authType) {
    case "Bearer":
      return `Bearer ${token}`;
    case "Basic":
      return `Basic ${token}`;
    case "ApiKey":
      return token;
    default:
      return `Bearer ${token}`;
  }
}
```

## 最佳实践

### 1. Token 安全

- 定期更新 token
- 使用 HTTPS 传输
- 考虑使用 httpOnly cookies 存储敏感 token

### 2. 性能优化

- Token 验证逻辑保持轻量级
- 避免在拦截器中进行复杂计算

### 3. 调试技巧

```typescript
// 开发环境下启用详细日志
if (process.env.NODE_ENV === 'development') {
  console.debug("TokenInterceptor: Token details", {
    hasToken: !!token,
    tokenLength: token?.length,
    url: req.url
  });
}
```

## 测试建议

### 1. 单元测试场景

- Token 存在且有效的情况
- Token 不存在的情况  
- Token 格式无效的情况
- localStorage 访问失败的情况
- 不需要认证的请求

### 2. 集成测试

- 验证 Authorization header 是否正确添加
- 验证不匹配模式的请求不被影响
- 验证错误处理是否正常工作

## 故障排除

### 常见问题

1. **Token 没有被添加到请求中**
   - 检查 URL 是否匹配 `AUTH_REQUIRED_PATTERNS`
   - 确认 localStorage 中存在有效 token
   - 查看控制台日志了解具体原因

2. **401 认证失败**
   - 验证 token 格式是否正确
   - 检查服务端是否正确解析 Authorization header
   - 确认 token 没有过期

3. **TypeScript 类型错误**
   - 确保正确导入了 @ngify/http 类型
   - 检查 HttpRequest 的泛型参数

### 调试步骤

1. 打开浏览器开发者工具
2. 查看 Network 标签页中的请求 headers
3. 检查 Console 中的 TokenInterceptor 日志
4. 验证 localStorage 中的 token 值

## 更新日志

- v1.0.0: 初始版本，支持基本 token 注入功能
- 包含完整的错误处理和日志记录
- 提供工具函数用于 token 管理
- TypeScript 类型安全支持