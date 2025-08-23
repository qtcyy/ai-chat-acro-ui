# RxJS 完整学习指南

## 🎯 什么是 RxJS？

RxJS (Reactive Extensions for JavaScript) 是一个响应式编程库，使用 Observable 序列来组合异步和基于事件的程序。它提供了一种强大的方式来处理异步数据流。

### 核心思想

```typescript
// 传统的命令式编程
let x = 1;
let y = 2;
let z = x + y; // z = 3

x = 10; // z 仍然是 3，不会自动更新

// 响应式编程
const x$ = new BehaviorSubject(1);
const y$ = new BehaviorSubject(2);
const z$ = combineLatest([x$, y$]).pipe(
  map(([x, y]) => x + y)
);

z$.subscribe(console.log); // 输出: 3

x$.next(10); // z$ 自动更新，输出: 12
```

## 📚 RxJS 核心概念

### 1. Observable - 可观察对象

Observable 是 RxJS 的核心，代表一个可以发射多个值的数据流。

```typescript
import { Observable } from 'rxjs';

// 创建一个简单的 Observable
const simple$ = new Observable(subscriber => {
  subscriber.next('Hello');
  subscriber.next('World');
  subscriber.complete();
});

// 订阅 Observable
simple$.subscribe({
  next: value => console.log(value),
  error: err => console.error(err),
  complete: () => console.log('完成')
});
```

**Observable 的特点:**

- **懒加载**: 只有订阅时才开始执行
- **多值**: 可以发射 0 到无限个值
- **异步**: 支持同步和异步数据流
- **可取消**: 通过 unsubscribe() 取消订阅

### 2. Observer - 观察者

Observer 是一个对象，定义了如何处理 Observable 发射的值。

```typescript
const observer = {
  next: (value: any) => console.log('收到值:', value),
  error: (error: any) => console.error('发生错误:', error),
  complete: () => console.log('流结束')
};

observable$.subscribe(observer);
```

### 3. Subscription - 订阅

Subscription 代表 Observable 的执行，主要用于取消订阅。

```typescript
const subscription = observable$.subscribe(value => console.log(value));

// 取消订阅，释放资源
subscription.unsubscribe();
```

### 4. Subject - 主体

Subject 既是 Observable 又是 Observer，可以多播值给多个订阅者。

```typescript
import { Subject } from 'rxjs';

const subject = new Subject<number>();

// 订阅者 A
subject.subscribe({
  next: (v) => console.log(`观察者A: ${v}`)
});

// 订阅者 B
subject.subscribe({
  next: (v) => console.log(`观察者B: ${v}`)
});

// 发射值给所有订阅者
subject.next(1); // 观察者A: 1, 观察者B: 1
subject.next(2); // 观察者A: 2, 观察者B: 2
```

## 🔧 Subject 的变种

### 1. BehaviorSubject

保存当前值，新订阅者立即收到最新值。

```typescript
import { BehaviorSubject } from 'rxjs';

const behaviorSubject = new BehaviorSubject(0); // 初始值为 0

behaviorSubject.subscribe(value => console.log('订阅者A:', value)); // 输出: 订阅者A: 0

behaviorSubject.next(1);
behaviorSubject.next(2);

behaviorSubject.subscribe(value => console.log('订阅者B:', value)); // 输出: 订阅者B: 2 (立即收到最新值)

behaviorSubject.next(3); // 输出: 订阅者A: 3, 订阅者B: 3
```

### 2. ReplaySubject

缓存指定数量的值，新订阅者会收到这些缓存的值。

```typescript
import { ReplaySubject } from 'rxjs';

const replaySubject = new ReplaySubject(3); // 缓存最新的3个值

replaySubject.next(1);
replaySubject.next(2);
replaySubject.next(3);
replaySubject.next(4);

replaySubject.subscribe(value => console.log('订阅者:', value));
// 输出: 订阅者: 2, 订阅者: 3, 订阅者: 4
```

### 3. AsyncSubject

只发射最后一个值，且必须调用 complete()。

```typescript
import { AsyncSubject } from 'rxjs';

const asyncSubject = new AsyncSubject();

asyncSubject.subscribe(value => console.log('订阅者:', value));

asyncSubject.next(1);
asyncSubject.next(2);
asyncSubject.next(3);
asyncSubject.complete(); // 输出: 订阅者: 3
```

## 🛠️ Observable 创建操作符

### 1. 基础创建方法

```typescript
import { of, from, fromEvent, interval, timer } from 'rxjs';

// of - 发射指定的值
of(1, 2, 3).subscribe(console.log); // 1, 2, 3

// from - 从数组、Promise、迭代器创建
from([1, 2, 3]).subscribe(console.log); // 1, 2, 3
from(Promise.resolve('Hello')).subscribe(console.log); // Hello

// fromEvent - 从DOM事件创建
const button = document.querySelector('button');
fromEvent(button, 'click').subscribe(() => console.log('按钮被点击'));

// interval - 定时发射
interval(1000).subscribe(n => console.log(`定时器: ${n}`)); // 每秒发射递增数字

// timer - 延迟后发射
timer(2000).subscribe(() => console.log('2秒后执行'));
```

### 2. 自定义 Observable

```typescript
import { Observable } from 'rxjs';

const customObservable$ = new Observable(subscriber => {
  let count = 0;
  
  const intervalId = setInterval(() => {
    if (count < 5) {
      subscriber.next(count++);
    } else {
      subscriber.complete();
      clearInterval(intervalId);
    }
  }, 1000);

  // 清理函数，订阅取消时调用
  return () => {
    clearInterval(intervalId);
    console.log('清理资源');
  };
});
```

## 🔄 常用操作符

### 转换操作符

#### map - 转换每个值

```typescript
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

of(1, 2, 3).pipe(
  map(x => x * 2)
).subscribe(console.log); // 2, 4, 6
```

#### mergeMap - 并发处理

```typescript
import { of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

of('a', 'b', 'c').pipe(
  mergeMap(x => of(x).pipe(delay(1000))) // 并发执行，不等待前一个完成
).subscribe(console.log);
```

#### switchMap - 切换到最新

```typescript
import { fromEvent } from 'rxjs';
import { switchMap } from 'rxjs/operators';

// 用户输入搜索，取消前一个搜索请求
fromEvent(searchInput, 'input').pipe(
  switchMap(event => searchAPI(event.target.value))
).subscribe(results => console.log(results));
```

#### concatMap - 顺序执行

```typescript
import { of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';

of('a', 'b', 'c').pipe(
  concatMap(x => of(x).pipe(delay(1000))) // 顺序执行，等待前一个完成
).subscribe(console.log);
```

### 过滤操作符

#### filter - 过滤值

```typescript
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

of(1, 2, 3, 4, 5).pipe(
  filter(x => x % 2 === 0) // 只保留偶数
).subscribe(console.log); // 2, 4
```

#### debounceTime - 防抖

```typescript
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

// 用户停止输入300ms后才执行搜索
fromEvent(searchInput, 'input').pipe(
  debounceTime(300)
).subscribe(event => search(event.target.value));
```

#### throttleTime - 节流

```typescript
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

// 每1000ms最多执行一次
fromEvent(button, 'click').pipe(
  throttleTime(1000)
).subscribe(() => console.log('点击事件'));
```

#### distinctUntilChanged - 去重

```typescript
import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

of(1, 1, 2, 2, 3, 3, 2).pipe(
  distinctUntilChanged() // 过滤连续重复的值
).subscribe(console.log); // 1, 2, 3, 2
```

### 组合操作符

#### combineLatest - 合并最新值

```typescript
import { combineLatest, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const name$ = of('Alice');
const age$ = of(25).pipe(delay(1000));

combineLatest([name$, age$]).subscribe(([name, age]) => {
  console.log(`姓名: ${name}, 年龄: ${age}`);
}); // 等待所有流都有值后才发射
```

#### merge - 合并多个流

```typescript
import { merge, interval } from 'rxjs';
import { map } from 'rxjs/operators';

const timer1$ = interval(1000).pipe(map(() => 'Timer 1'));
const timer2$ = interval(2000).pipe(map(() => 'Timer 2'));

merge(timer1$, timer2$).subscribe(console.log);
// 输出混合的定时器消息
```

#### zip - 配对发射

```typescript
import { zip, of } from 'rxjs';

const names$ = of('Alice', 'Bob', 'Charlie');
const ages$ = of(25, 30, 35);

zip(names$, ages$).subscribe(([name, age]) => {
  console.log(`${name}: ${age}岁`);
});
// Alice: 25岁, Bob: 30岁, Charlie: 35岁
```

### 错误处理操作符

#### catchError - 捕获错误

```typescript
import { throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

throwError('出错了!').pipe(
  catchError(error => {
    console.error('捕获到错误:', error);
    return of('默认值'); // 返回备用值
  })
).subscribe(console.log); // 输出: 默认值
```

#### retry - 重试

```typescript
import { ajax } from 'rxjs/ajax';
import { retry, catchError } from 'rxjs/operators';

ajax('/api/data').pipe(
  retry(3), // 失败时重试3次
  catchError(error => {
    console.error('重试3次后仍然失败:', error);
    return of({ error: '请求失败' });
  })
).subscribe(console.log);
```

### 工具操作符

#### tap - 执行副作用

```typescript
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

of(1, 2, 3).pipe(
  tap(x => console.log('处理前:', x)), // 调试输出
  map(x => x * 2),
  tap(x => console.log('处理后:', x))
).subscribe();
```

#### delay - 延迟发射

```typescript
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

of('Hello World').pipe(
  delay(2000) // 延迟2秒
).subscribe(console.log);
```

#### take - 取前N个值

```typescript
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

interval(1000).pipe(
  take(3) // 只取前3个值
).subscribe(console.log); // 0, 1, 2
```

#### shareReplay - 共享并缓存

```typescript
import { ajax } from 'rxjs/ajax';
import { shareReplay } from 'rxjs/operators';

const data$ = ajax('/api/data').pipe(
  shareReplay(1) // 缓存最新结果，多个订阅者共享
);

data$.subscribe(console.log); // 执行HTTP请求
data$.subscribe(console.log); // 使用缓存结果，不会重新请求
```

## 🌟 高级用法和模式

### 1. 流的生命周期管理

```typescript
import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    // 使用 takeUntil 管理订阅生命周期
    someObservable$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      // 处理数据
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 2. 冷热 Observable

```typescript
// 冷 Observable - 每个订阅者都有独立的执行
const cold$ = new Observable(subscriber => {
  console.log('开始执行');
  subscriber.next(Math.random());
});

cold$.subscribe(console.log); // 开始执行, 0.123...
cold$.subscribe(console.log); // 开始执行, 0.456...

// 热 Observable - 多个订阅者共享同一个执行
const hot$ = cold$.pipe(share());

hot$.subscribe(console.log); // 开始执行, 0.789...
hot$.subscribe(console.log); // 不会重新执行, 0.789...
```

### 3. 错误恢复策略

```typescript
import { EMPTY, of } from 'rxjs';
import { catchError, retryWhen, delay, take } from 'rxjs/operators';

// 智能重试策略
const smartRetry = (maxRetries: number) => 
  retryWhen(errors => 
    errors.pipe(
      delay(1000), // 延迟1秒后重试
      take(maxRetries), // 最多重试指定次数
      catchError(() => EMPTY) // 重试次数用完后返回空流
    )
  );

apiCall$.pipe(
  smartRetry(3)
).subscribe(
  result => console.log(result),
  error => console.error('最终失败:', error)
);
```

## 🎯 实战应用场景

### 1. 搜索功能

```typescript
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

const searchInput = document.getElementById('search');

fromEvent(searchInput, 'input').pipe(
  map(event => event.target.value),
  debounceTime(300), // 防抖
  distinctUntilChanged(), // 去重
  switchMap(term => searchAPI(term)) // 切换到最新搜索
).subscribe(results => {
  displayResults(results);
});
```

### 2. 自动保存

```typescript
import { fromEvent, merge } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

const textArea = document.getElementById('editor');
const saveButton = document.getElementById('save');

// 合并输入事件和保存按钮点击
merge(
  fromEvent(textArea, 'input').pipe(debounceTime(2000)), // 停止输入2秒后
  fromEvent(saveButton, 'click') // 或点击保存按钮
).pipe(
  tap(() => console.log('正在保存...'))
).subscribe(() => {
  saveDocument(textArea.value);
});
```

### 3. 轮询请求

```typescript
import { interval, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

// 每5秒轮询一次数据
interval(5000).pipe(
  switchMap(() => fetchData().pipe(
    catchError(error => {
      console.error('轮询失败:', error);
      return EMPTY; // 忽略错误，继续轮询
    })
  ))
).subscribe(data => {
  updateUI(data);
});
```

### 4. WebSocket 连接管理

```typescript
import { webSocket } from 'rxjs/webSocket';
import { retry, tap } from 'rxjs/operators';

const ws$ = webSocket({
  url: 'ws://localhost:8080',
  openObserver: {
    next: () => console.log('WebSocket 连接已建立')
  },
  closeObserver: {
    next: () => console.log('WebSocket 连接已关闭')
  }
});

ws$.pipe(
  retry(), // 断线自动重连
  tap(message => console.log('收到消息:', message))
).subscribe();

// 发送消息
ws$.next({ type: 'message', data: 'Hello Server' });
```

## 🔍 调试技巧

### 1. 使用 tap 调试

```typescript
import { tap } from 'rxjs/operators';

observable$.pipe(
  tap(value => console.log('步骤1:', value)),
  map(x => x * 2),
  tap(value => console.log('步骤2:', value)),
  filter(x => x > 10),
  tap(value => console.log('步骤3:', value))
).subscribe();
```

### 2. 错误调试

```typescript
import { catchError } from 'rxjs/operators';

observable$.pipe(
  catchError(error => {
    console.error('发生错误:', error);
    console.trace(); // 打印调用栈
    throw error; // 重新抛出错误
  })
).subscribe();
```

## ⚠️ 常见陷阱和最佳实践

### 1. 内存泄漏防护

```typescript
// ❌ 错误：忘记取消订阅
class Component {
  ngOnInit() {
    interval(1000).subscribe(console.log); // 内存泄漏！
  }
}

// ✅ 正确：记得取消订阅
class Component implements OnDestroy {
  private subscription = new Subscription();
  
  ngOnInit() {
    this.subscription.add(
      interval(1000).subscribe(console.log)
    );
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe(); // 清理资源
  }
}
```

### 2. 避免嵌套订阅

```typescript
// ❌ 错误：嵌套订阅
observable1$.subscribe(value1 => {
  observable2$.subscribe(value2 => {
    // 处理逻辑
  });
});

// ✅ 正确：使用操作符
observable1$.pipe(
  switchMap(value1 => observable2$)
).subscribe(value2 => {
  // 处理逻辑
});
```

### 3. 合理选择操作符

```typescript
// 搜索场景：使用 switchMap（取消前一个请求）
searchTerm$.pipe(switchMap(term => searchAPI(term)))

// 独立请求：使用 mergeMap（并发执行）
fileList$.pipe(mergeMap(file => uploadFile(file)))

// 顺序处理：使用 concatMap（保持顺序）
taskQueue$.pipe(concatMap(task => processTask(task)))
```

## ⚛️ RxJS 与 React 集成

### 1. 基本集成模式

#### 使用 useEffect 管理订阅

```typescript
import React, { useState, useEffect } from 'react';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

function TimerComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 创建定时器Observable
    const timer$ = interval(1000).pipe(
      map(n => n + 1)
    );

    // 订阅Observable
    const subscription = timer$.subscribe(value => {
      setCount(value);
    });

    // 清理函数：组件卸载时取消订阅
    return () => {
      subscription.unsubscribe();
      console.log('定时器已清理');
    };
  }, []); // 空依赖数组，只在挂载时执行

  return <div>计数器: {count}</div>;
}
```

#### 自定义 Hook 封装 Observable

```typescript
import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

// 通用的Observable Hook
function useObservable<T>(observable$: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const subscription = observable$.subscribe({
      next: setValue,
      error: (error) => console.error('Observable错误:', error)
    });

    return () => subscription.unsubscribe();
  }, [observable$]);

  return value;
}

// 使用示例
function WeatherComponent() {
  const weather = useObservable(weatherService.getCurrentWeather(), '加载中...');
  
  return <div>当前天气: {weather}</div>;
}
```

### 2. 状态管理集成

#### BehaviorSubject 作为全局状态

```typescript
import { BehaviorSubject } from 'rxjs';
import { useState, useEffect } from 'react';

// 创建全局状态
export class UserStore {
  private userSubject$ = new BehaviorSubject({ name: '', loggedIn: false });
  
  // 暴露只读的Observable
  user$ = this.userSubject$.asObservable();
  
  // 更新用户信息
  updateUser(user: { name: string; loggedIn: boolean }) {
    this.userSubject$.next(user);
  }
  
  // 获取当前值
  getCurrentUser() {
    return this.userSubject$.value;
  }
}

export const userStore = new UserStore();

// React组件中使用
function UserProfile() {
  const [user, setUser] = useState(userStore.getCurrentUser());

  useEffect(() => {
    const subscription = userStore.user$.subscribe(setUser);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      {user.loggedIn ? `欢迎, ${user.name}` : '请登录'}
    </div>
  );
}

// 更新用户状态
function LoginButton() {
  const handleLogin = () => {
    userStore.updateUser({ name: 'Alice', loggedIn: true });
  };

  return <button onClick={handleLogin}>登录</button>;
}
```

#### 结合 React Context

```typescript
import React, { createContext, useContext, ReactNode } from 'react';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

// 创建响应式数据流
class AppStateStore {
  private theme$ = new BehaviorSubject<'light' | 'dark'>('light');
  private language$ = new BehaviorSubject<'zh' | 'en'>('zh');
  
  // 组合状态流
  appState$ = combineLatest([this.theme$, this.language$]).pipe(
    map(([theme, language]) => ({ theme, language }))
  );
  
  setTheme(theme: 'light' | 'dark') {
    this.theme$.next(theme);
  }
  
  setLanguage(language: 'zh' | 'en') {
    this.language$.next(language);
  }
}

// 创建Context
const AppStateContext = createContext<AppStateStore | null>(null);

// Provider组件
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => new AppStateStore());
  
  return (
    <AppStateContext.Provider value={store}>
      {children}
    </AppStateContext.Provider>
  );
}

// Hook for using the store
export function useAppState() {
  const store = useContext(AppStateContext);
  if (!store) throw new Error('useAppState must be used within AppStateProvider');
  
  const [state, setState] = useState({ theme: 'light', language: 'zh' });
  
  useEffect(() => {
    const subscription = store.appState$.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [store]);
  
  return {
    state,
    setTheme: store.setTheme.bind(store),
    setLanguage: store.setLanguage.bind(store)
  };
}

// 使用示例
function ThemeToggle() {
  const { state, setTheme } = useAppState();
  
  return (
    <button onClick={() => setTheme(state.theme === 'light' ? 'dark' : 'light')}>
      当前主题: {state.theme}
    </button>
  );
}
```

### 3. 表单处理

#### 响应式表单验证

```typescript
import React, { useState, useEffect } from 'react';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

function useFormValidation() {
  const [email$] = useState(() => new BehaviorSubject(''));
  const [password$] = useState(() => new BehaviorSubject(''));
  
  // 验证逻辑
  const emailValid$ = email$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
  );
  
  const passwordValid$ = password$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    map(password => password.length >= 6)
  );
  
  // 表单整体有效性
  const formValid$ = combineLatest([emailValid$, passwordValid$]).pipe(
    map(([emailValid, passwordValid]) => emailValid && passwordValid)
  );
  
  const [validation, setValidation] = useState({
    emailValid: false,
    passwordValid: false,
    formValid: false
  });
  
  useEffect(() => {
    const subscription = combineLatest([
      emailValid$,
      passwordValid$,
      formValid$
    ]).subscribe(([emailValid, passwordValid, formValid]) => {
      setValidation({ emailValid, passwordValid, formValid });
    });
    
    return () => subscription.unsubscribe();
  }, [emailValid$, passwordValid$, formValid$]);
  
  return {
    validation,
    updateEmail: (email: string) => email$.next(email),
    updatePassword: (password: string) => password$.next(password)
  };
}

// 登录表单组件
function LoginForm() {
  const { validation, updateEmail, updatePassword } = useFormValidation();
  
  return (
    <form>
      <div>
        <input
          type="email"
          placeholder="邮箱"
          onChange={e => updateEmail(e.target.value)}
          style={{
            borderColor: validation.emailValid ? 'green' : 'red'
          }}
        />
        {!validation.emailValid && <span>请输入有效邮箱</span>}
      </div>
      
      <div>
        <input
          type="password"
          placeholder="密码"
          onChange={e => updatePassword(e.target.value)}
          style={{
            borderColor: validation.passwordValid ? 'green' : 'red'
          }}
        />
        {!validation.passwordValid && <span>密码至少6位</span>}
      </div>
      
      <button 
        type="submit" 
        disabled={!validation.formValid}
      >
        登录
      </button>
    </form>
  );
}
```

### 4. API 数据获取

#### 响应式数据加载

```typescript
import React, { useState, useEffect } from 'react';
import { BehaviorSubject, of } from 'rxjs';
import { switchMap, catchError, startWith } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// 数据状态接口
interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// 响应式数据获取Hook
function useAsyncData<T>(url$: BehaviorSubject<string>) {
  const [state, setState] = useState<DataState<T>>({
    data: null,
    loading: false,
    error: null
  });
  
  useEffect(() => {
    const subscription = url$.pipe(
      switchMap(url => 
        ajax.getJSON<T>(url).pipe(
          map(data => ({ data, loading: false, error: null })),
          startWith({ data: null, loading: true, error: null }),
          catchError(error => 
            of({ data: null, loading: false, error: error.message })
          )
        )
      )
    ).subscribe(setState);
    
    return () => subscription.unsubscribe();
  }, [url$]);
  
  return state;
}

// 用户列表组件
function UserList() {
  const [url$] = useState(() => new BehaviorSubject('/api/users'));
  const { data, loading, error } = useAsyncData<User[]>(url$);
  
  const loadPage = (page: number) => {
    url$.next(`/api/users?page=${page}`);
  };
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  if (!data) return <div>暂无数据</div>;
  
  return (
    <div>
      {data.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
      <button onClick={() => loadPage(1)}>第1页</button>
      <button onClick={() => loadPage(2)}>第2页</button>
    </div>
  );
}
```

### 5. 实时数据与WebSocket

#### React中的WebSocket集成

```typescript
import React, { useState, useEffect } from 'react';
import { webSocket } from 'rxjs/webSocket';
import { retry, tap } from 'rxjs/operators';

interface Message {
  id: string;
  text: string;
  timestamp: number;
}

function useChatSocket(url: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connected, setConnected] = useState(false);
  const [ws$] = useState(() => 
    webSocket({
      url,
      openObserver: {
        next: () => setConnected(true)
      },
      closeObserver: {
        next: () => setConnected(false)
      }
    })
  );
  
  useEffect(() => {
    const subscription = ws$.pipe(
      retry({ delay: 5000 }), // 断线5秒后重连
      tap(message => console.log('收到消息:', message))
    ).subscribe({
      next: (message: Message) => {
        setMessages(prev => [...prev, message]);
      },
      error: (error) => {
        console.error('WebSocket错误:', error);
        setConnected(false);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [ws$]);
  
  const sendMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now()
    };
    ws$.next(message);
  };
  
  return { messages, connected, sendMessage };
}

// 聊天组件
function ChatRoom() {
  const { messages, connected, sendMessage } = useChatSocket('ws://localhost:8080');
  const [inputValue, setInputValue] = useState('');
  
  const handleSend = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };
  
  return (
    <div>
      <div>连接状态: {connected ? '已连接' : '未连接'}</div>
      
      <div style={{ height: '300px', overflowY: 'auto' }}>
        {messages.map(message => (
          <div key={message.id}>
            <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      
      <div>
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
          placeholder="输入消息..."
        />
        <button onClick={handleSend} disabled={!connected}>
          发送
        </button>
      </div>
    </div>
  );
}
```

### 6. 搜索功能实现

#### 基于我们项目的搜索Hook

```typescript
import { useState, useEffect } from 'react';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// 搜索Hook（基于项目实际代码）
function useReactiveSearch<T>(
  items: T[],
  searchFn: (query: string) => Observable<T[]>,
  filterFn: (items: T[], query: string) => T[]
) {
  const [searchQuery$] = useState(() => new BehaviorSubject<string>(''));
  const [items$] = useState(() => new BehaviorSubject<T[]>([]));
  const [results, setResults] = useState<T[]>([]);
  const [searching, setSearching] = useState(false);
  
  // 同步items到流
  useEffect(() => {
    items$.next(items);
  }, [items, items$]);
  
  // 响应式搜索流
  useEffect(() => {
    const subscription = combineLatest([
      searchQuery$.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ),
      items$
    ]).pipe(
      switchMap(([query, currentItems]) => {
        if (!query.trim()) {
          return of(currentItems);
        }
        
        setSearching(true);
        
        // 本地搜索
        const localResults = filterFn(currentItems, query);
        
        // 如果本地结果不足，执行远程搜索
        if (localResults.length < 3) {
          return searchFn(query).pipe(
            map(remoteResults => {
              // 合并并去重
              const combined = [...localResults];
              remoteResults.forEach(remote => {
                if (!combined.some(local => 
                  JSON.stringify(local) === JSON.stringify(remote)
                )) {
                  combined.push(remote);
                }
              });
              return combined;
            }),
            catchError(() => of(localResults))
          );
        }
        
        return of(localResults);
      })
    ).subscribe({
      next: (results) => {
        setResults(results);
        setSearching(false);
      },
      error: () => setSearching(false)
    });
    
    return () => subscription.unsubscribe();
  }, [searchQuery$, items$, searchFn, filterFn]);
  
  const search = (query: string) => {
    searchQuery$.next(query);
  };
  
  return { results, searching, search };
}

// 聊天历史搜索组件
function ChatHistorySearch() {
  const { searchChats } = useHistory();
  const [chats, setChats] = useState<ChatType[]>([]);
  
  const { results, searching, search } = useReactiveSearch(
    chats,
    searchChats, // 远程搜索函数
    (items, query) => items.filter(chat => 
      chat.title.toLowerCase().includes(query.toLowerCase())
    ) // 本地过滤函数
  );
  
  return (
    <div>
      <input
        type="text"
        placeholder="搜索聊天历史..."
        onChange={e => search(e.target.value)}
      />
      
      {searching && <div>搜索中...</div>}
      
      <div>
        {results.map(chat => (
          <div key={chat.id}>
            {chat.title}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 7. 最佳实践

#### 内存泄漏预防

```typescript
// ✅ 使用自定义Hook管理订阅生命周期
function useSubscription() {
  const subscriptionsRef = useRef<Subscription[]>([]);
  
  useEffect(() => {
    return () => {
      // 组件卸载时取消所有订阅
      subscriptionsRef.current.forEach(sub => sub.unsubscribe());
    };
  }, []);
  
  const addSubscription = (subscription: Subscription) => {
    subscriptionsRef.current.push(subscription);
  };
  
  return { addSubscription };
}

// 使用示例
function MyComponent() {
  const { addSubscription } = useSubscription();
  
  useEffect(() => {
    const sub1 = observable1$.subscribe(handler1);
    const sub2 = observable2$.subscribe(handler2);
    
    addSubscription(sub1);
    addSubscription(sub2);
  }, [addSubscription]);
  
  return <div>组件内容</div>;
}
```

#### React 严格模式兼容

```typescript
// ✅ 处理React 18 严格模式下的双重执行
function useObservableValue<T>(observable$: Observable<T>, initialValue: T) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    let subscription: Subscription;
    
    // 延迟订阅，避免严格模式下的问题
    const timeoutId = setTimeout(() => {
      subscription = observable$.subscribe(setValue);
    }, 0);
    
    return () => {
      clearTimeout(timeoutId);
      subscription?.unsubscribe();
    };
  }, [observable$]);
  
  return value;
}
```

#### TypeScript 类型安全

```typescript
// ✅ 强类型的Observable Hook
interface UseObservableOptions<T> {
  initialValue: T;
  onError?: (error: any) => void;
  onComplete?: () => void;
}

function useTypedObservable<T>(
  observable$: Observable<T>,
  options: UseObservableOptions<T>
): T {
  const [value, setValue] = useState<T>(options.initialValue);
  
  useEffect(() => {
    const subscription = observable$.subscribe({
      next: setValue,
      error: options.onError || console.error,
      complete: options.onComplete
    });
    
    return () => subscription.unsubscribe();
  }, [observable$, options]);
  
  return value;
}
```

## 📖 学习路径建议

1. **基础概念**: Observable, Observer, Subscription
2. **创建方法**: of, from, interval, fromEvent
3. **常用操作符**: map, filter, tap, take
4. **异步处理**: switchMap, mergeMap, concatMap
5. **组合操作**: combineLatest, merge, zip
6. **错误处理**: catchError, retry
7. **高级概念**: Subject, BehaviorSubject, 冷热流
8. **React集成**: useEffect订阅管理、自定义Hook、Context集成
9. **实战应用**: 搜索、表单验证、实时数据、状态管理

## 🎓 总结

RxJS 是一个强大的响应式编程库，它的核心优势包括：

- **声明式编程**: 描述数据如何变换，而非如何执行
- **组合性强**: 操作符可以灵活组合，构建复杂的数据流
- **异步统一**: 用同一套API处理各种异步场景
- **错误处理**: 提供完善的错误处理和恢复机制

掌握 RxJS 需要转变思维方式，从命令式编程转向声明式的数据流编程。在 React 项目中，RxJS 提供了强大的状态管理和异步处理能力，特别适合处理复杂的用户交互、实时数据和搜索功能。通过大量练习和实际项目应用，你将能够利用 RxJS 构建出优雅、可维护的响应式应用程序。

## 🚀 项目实践建议

基于我们项目中的实际应用，推荐以下实践步骤：

1. **从简单Hook开始**: 先实现 `useObservable` 等基础Hook
2. **状态管理升级**: 使用BehaviorSubject替代复杂的useState场景
3. **搜索功能优化**: 参考项目中的响应式搜索实现
4. **表单验证改进**: 利用RxJS的组合操作符处理复杂验证逻辑
5. **实时数据处理**: WebSocket、SSE等实时数据流的统一处理

通过这些实践，你将深刻理解响应式编程在现代React应用中的价值和威力。