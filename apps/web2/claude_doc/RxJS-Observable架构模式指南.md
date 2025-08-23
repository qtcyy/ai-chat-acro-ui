# RxJS Observable 架构模式指南

## 概述

本文档详细说明在 React 应用中正确使用 RxJS Observable 的架构模式，特别针对 HTTP 请求和表单验证的集成使用。

## Observable 嵌套问题分析

### 常见反模式：Observable 嵌套

```typescript
// ❌ 错误：产生嵌套 Observable
return sourceObservable$.pipe(
  map(value => of(httpClient.post(url, data))) // Observable<Observable<HttpResponse>>
);

// ❌ 错误：手动订阅内部 Observable
return sourceObservable$.pipe(
  map(value => {
    const innerObs$ = httpClient.post(url, data);
    innerObs$.subscribe(result => {
      // 反模式：破坏了响应式链
    });
    return innerObs$;
  })
);
```

### 正确模式：Observable 展平

```typescript
// ✅ 正确：使用展平操作符
return sourceObservable$.pipe(
  switchMap(value => httpClient.post(url, data)) // Observable<HttpResponse>
);

// ✅ 正确：链式处理
return sourceObservable$.pipe(
  switchMap(value => httpClient.post(url, data)),
  map(response => response.data),
  catchError(error => of(defaultValue))
);
```

## 展平操作符详解

### switchMap - 切换映射

**使用场景**: HTTP 请求、搜索建议、用户交互响应

```typescript
// 登录请求 - 取消之前的请求
login$ = formData$.pipe(
  switchMap(({ username, password }) => 
    http.post('/login', { username, password })
  )
);

// 搜索建议 - 只显示最新搜索结果
searchResults$ = searchTerm$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => http.get(`/search?q=${term}`))
);
```

**特点**:
- 🔄 取消之前的内部 Observable
- ⚡ 只保持最新请求活跃
- 🎯 适合用户交互场景

### mergeMap - 合并映射

**使用场景**: 并行请求、文件上传、日志记录

```typescript
// 批量文件上传
uploadFiles$ = files$.pipe(
  mergeMap(file => http.post('/upload', file), 3) // 最多3个并发请求
);

// 并行获取用户详情
userDetails$ = userIds$.pipe(
  mergeMap(id => http.get(`/users/${id}`))
);
```

**特点**:
- 🔀 允许并发执行
- ⚖️ 可控制并发数量
- 📊 适合批量处理场景

### concatMap - 串联映射

**使用场景**: 顺序操作、状态更新、事务处理

```typescript
// 顺序更新用户信息
updateUserProfile$ = profileUpdates$.pipe(
  concatMap(update => http.patch('/user/profile', update))
);

// 按顺序处理队列任务
processQueue$ = tasks$.pipe(
  concatMap(task => processTask(task))
);
```

**特点**:
- 📝 严格顺序执行
- 🔒 等待前一个完成
- 🎯 适合事务场景

### exhaustMap - 耗尽映射

**使用场景**: 防止重复提交、一次性操作

```typescript
// 防止重复登录
login$ = loginAttempts$.pipe(
  exhaustMap(credentials => 
    http.post('/login', credentials)
  )
);

// 防止重复保存
save$ = saveAttempts$.pipe(
  exhaustMap(data => http.put('/save', data))
);
```

**特点**:
- 🛡️ 忽略新值直到当前完成
- 🚫 防止重复操作
- 🎯 适合一次性操作

## 表单验证与 HTTP 请求集成

### 反应式表单验证架构

```typescript
export const AuthProvider = () => {
  // 表单字段流
  const [username$] = useState(() => new BehaviorSubject(""));
  const [password$] = useState(() => new BehaviorSubject(""));

  // 验证流
  const usernameValid$ = username$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map(value => value.trim().length >= 6)
  );

  const passwordValid$ = password$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map(value => value.trim().length >= 8)
  );

  const formValid$ = combineLatest([
    usernameValid$,
    passwordValid$
  ]).pipe(
    map(([usernameValid, passwordValid]) => 
      usernameValid && passwordValid
    )
  );

  // HTTP 请求流
  const login = (): Observable<LoginResponse> => {
    return formValid$.pipe(
      take(1), // 获取当前验证状态
      switchMap(isValid => {
        if (!isValid) {
          return throwError(() => new Error('表单验证失败'));
        }

        return combineLatest([username$, password$]).pipe(
          take(1),
          switchMap(([username, password]) => 
            http.post('/login', { 
              username: username.trim(), 
              password 
            })
          )
        );
      })
    );
  };

  return { login, usernameValid$, passwordValid$, formValid$ };
};
```

## 错误处理模式

### 分层错误处理

```typescript
const loginWithErrorHandling = (): Observable<LoginResponse> => {
  return formData$.pipe(
    // 1. 输入验证层
    tap(data => {
      if (!data.username || !data.password) {
        throw new ValidationError('必填字段不能为空');
      }
    }),
    
    // 2. HTTP 请求层
    switchMap(data => 
      http.post<LoginResponse>('/login', data).pipe(
        // 3. HTTP 错误处理
        catchError(error => {
          if (error.status === 401) {
            return throwError(() => new AuthError('用户名或密码错误'));
          }
          if (error.status >= 500) {
            return throwError(() => new ServerError('服务器错误，请稍后重试'));
          }
          return throwError(() => new NetworkError('网络连接失败'));
        })
      )
    ),
    
    // 4. 业务逻辑层错误处理
    catchError(error => {
      console.error('登录失败:', error);
      
      if (error instanceof ValidationError) {
        // 显示表单验证错误
        return of({ success: false, error: error.message });
      }
      
      if (error instanceof AuthError) {
        // 显示认证错误
        return of({ success: false, error: error.message });
      }
      
      // 其他错误显示通用错误信息
      return of({ success: false, error: '登录失败，请稍后重试' });
    })
  );
};
```

## 状态管理集成

### 与 React State 集成

```typescript
const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    loading: false,
    user: null,
    error: null,
    isAuthenticated: false
  });

  const login = (credentials: LoginCredentials): Observable<void> => {
    return of(null).pipe(
      tap(() => setAuthState(prev => ({ ...prev, loading: true, error: null }))),
      
      switchMap(() => http.post<LoginResponse>('/login', credentials)),
      
      tap(response => {
        setAuthState({
          loading: false,
          user: response.user,
          error: null,
          isAuthenticated: true
        });
      }),
      
      catchError(error => {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
        return throwError(() => error);
      }),
      
      map(() => void 0) // 转换为 void 类型
    );
  };

  return { authState, login };
};
```

## 性能优化模式

### 请求缓存

```typescript
class ApiCache {
  private cache = new Map<string, Observable<any>>();

  getCachedRequest<T>(key: string, request: () => Observable<T>): Observable<T> {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    }

    const request$ = request().pipe(
      shareReplay(1), // 缓存最后一个值
      finalize(() => this.cache.delete(key)) // 清理缓存
    );

    this.cache.set(key, request$);
    return request$;
  }
}

// 使用示例
const getUserProfile = (userId: string): Observable<UserProfile> => {
  return apiCache.getCachedRequest(
    `user-profile-${userId}`,
    () => http.get(`/users/${userId}`)
  );
};
```

### 防抖和去重

```typescript
const optimizedSearch = (searchTerm$: Observable<string>) => {
  return searchTerm$.pipe(
    debounceTime(300),           // 防抖 300ms
    distinctUntilChanged(),      // 去除重复值
    filter(term => term.length >= 2), // 最少2个字符
    switchMap(term =>            // 只保留最新搜索
      http.get(`/search?q=${term}`).pipe(
        startWith([]),           // 立即返回空数组
        catchError(() => of([])) // 错误时返回空数组
      )
    )
  );
};
```

## 测试模式

### Observable 单元测试

```typescript
describe('AuthProvider login', () => {
  let authProvider: AuthProvider;
  let httpSpy: jest.SpyInstance;

  beforeEach(() => {
    httpSpy = jest.spyOn(http, 'post');
    authProvider = new AuthProvider();
  });

  it('should return single Observable with valid credentials', (done) => {
    const mockResponse = { token: 'abc123', user: { id: 1 } };
    httpSpy.mockReturnValue(of(mockResponse));

    // 设置有效表单数据
    authProvider.updateUsername('testuser');
    authProvider.updatePassword('password123');

    authProvider.login().subscribe({
      next: (response) => {
        expect(response).toEqual(mockResponse);
        expect(httpSpy).toHaveBeenCalledWith('/login', {
          username: 'testuser',
          password: 'password123'
        });
        done();
      }
    });
  });

  it('should cancel previous request on new login attempt', () => {
    const firstRequest$ = new Subject();
    const secondRequest$ = new Subject();
    
    httpSpy
      .mockReturnValueOnce(firstRequest$)
      .mockReturnValueOnce(secondRequest$);

    // 第一次登录
    const firstSub = authProvider.login().subscribe();
    
    // 第二次登录（应该取消第一次）
    const secondSub = authProvider.login().subscribe();

    expect(firstRequest$.observers.length).toBe(0); // 第一次请求被取消
    expect(secondRequest$.observers.length).toBe(1); // 第二次请求活跃
  });
});
```

## 最佳实践总结

### DO (推荐做法)

```typescript
// ✅ 使用适当的展平操作符
stream$.pipe(switchMap(value => httpCall(value)))

// ✅ 链式错误处理
stream$.pipe(
  switchMap(value => httpCall(value)),
  catchError(error => of(fallbackValue))
)

// ✅ 使用 take(1) 获取当前值
currentValue$ = stream$.pipe(take(1))

// ✅ 适当使用 shareReplay 缓存
shared$ = source$.pipe(shareReplay(1))
```

### DON'T (避免做法)

```typescript
// ❌ 不要嵌套 Observable
stream$.pipe(map(value => of(httpCall(value))))

// ❌ 不要手动订阅内部 Observable  
stream$.pipe(map(value => {
  httpCall(value).subscribe(result => {/* ... */});
}))

// ❌ 不要忘记取消订阅
useEffect(() => {
  const sub = stream$.subscribe();
  // 缺少 return () => sub.unsubscribe();
}, []);

// ❌ 不要在组件内创建新的 Observable
const MyComponent = () => {
  const data$ = new BehaviorSubject(initialValue); // 每次渲染都创建新实例
}
```

## 架构决策指南

选择正确的 RxJS 操作符：

```
用户交互响应 → switchMap
并发请求处理 → mergeMap  
顺序操作执行 → concatMap
防止重复提交 → exhaustMap
```

这个架构模式确保了代码的响应式、可维护性和性能优化。