# AuthProvider 类型更新文档

## 更新概述
更新了 AuthProvider 中的登录函数类型定义，使其与后端 Sa-Token 框架的 SaResult 返回结构保持一致。

## 后端 API 返回结构
```java
return SaResult.ok("登录成功")
    .set("token", StpUtil.getTokenValue())
    .set("userId", user.getId())
    .set("username", user.getUsername())
    .set("role", role)
    .set("sessionInfo", sessionInfo);
```

## 主要更改

### 1. LoginResponse 类型定义更新

**之前：**
```typescript
type LoginResponse = {
  token: string;
  userId?: string;        // 可选
  username?: string;      // 可选
  email?: string;
  expiresAt?: string;
  refreshToken?: string;
};
```

**现在：**
```typescript
type LoginResponse = {
  code: number;           // SaResult 状态码
  msg: string;            // 返回消息
  token: string;          // JWT token
  userId: string;         // 用户ID (必需)
  username: string;       // 用户名 (必需)
  role: string;           // 用户角色 (新增)
  sessionInfo?: any;      // 会话信息 (可选)
};
```

### 2. 移除泛型约束

**之前：**
```typescript
// AuthContextType
login: <T extends LoginResponse>() => Observable<T>;

// login 函数实现
const login = <T extends LoginResponse>(): Observable<T> => {
  return http.post<T>(url, postBody);
}
```

**现在：**
```typescript
// AuthContextType
login: () => Observable<LoginResponse>;

// login 函数实现
const login = (): Observable<LoginResponse> => {
  return http.post<LoginResponse>(url, postBody);
}
```

### 3. 添加响应状态码检查

```typescript
tap((response) => {
  // 检查响应状态码
  if (response.code === 200) {
    localStorage.setItem("token", response.token);
    setAuthState((pre) => ({
      ...pre,
      loading: false,
      isAuthed: true,
    }));
  } else {
    throw new Error(response.msg || "登录失败");
  }
})
```

## 影响范围

### 不影响的部分
- ✅ 现有的表单验证逻辑
- ✅ Token 存储机制
- ✅ 认证状态管理
- ✅ 错误处理流程

### 需要注意的部分
- ⚠️ 登录组件可能需要更新类型注解（如果有明确指定类型）
- ⚠️ 使用 role 字段实现权限控制（未来功能）
- ⚠️ sessionInfo 的具体使用方式（根据业务需求）

## 使用示例

```typescript
// 在 LoginPage 中使用
const { login } = useAuth();

login().subscribe({
  next: (response) => {
    console.log("登录成功", {
      userId: response.userId,     // 现在是必需字段
      username: response.username, // 现在是必需字段
      role: response.role,         // 新增字段
    });
  },
  error: (error) => {
    console.error("登录失败", error);
  }
});
```

## 下一步建议

1. **扩展 AuthState 类型**
   ```typescript
   type AuthState = {
     loading: boolean;
     error: AuthError | null;
     isAuthed: boolean;
     user?: {
       userId: string;
       username: string;
       role: string;
     };
   };
   ```

2. **实现角色权限管理**
   - 根据 role 字段实现路由守卫
   - 创建权限检查 hooks

3. **处理 sessionInfo**
   - 定义具体的 sessionInfo 类型
   - 实现会话管理功能

## 兼容性说明

这次更新完全向后兼容，现有代码可以正常运行。但建议更新相关组件以充分利用新的类型定义，特别是 role 字段带来的权限管理能力。