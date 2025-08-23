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

## 📖 学习路径建议

1. **基础概念**: Observable, Observer, Subscription
2. **创建方法**: of, from, interval, fromEvent
3. **常用操作符**: map, filter, tap, take
4. **异步处理**: switchMap, mergeMap, concatMap
5. **组合操作**: combineLatest, merge, zip
6. **错误处理**: catchError, retry
7. **高级概念**: Subject, BehaviorSubject, 冷热流
8. **实战应用**: 搜索、轮询、WebSocket

## 🎓 总结

RxJS 是一个强大的响应式编程库，它的核心优势包括：

- **声明式编程**: 描述数据如何变换，而非如何执行
- **组合性强**: 操作符可以灵活组合，构建复杂的数据流
- **异步统一**: 用同一套API处理各种异步场景
- **错误处理**: 提供完善的错误处理和恢复机制

掌握 RxJS 需要转变思维方式，从命令式编程转向声明式的数据流编程。通过大量练习和实际项目应用，你将能够利用 RxJS 构建出优雅、可维护的异步应用程序。