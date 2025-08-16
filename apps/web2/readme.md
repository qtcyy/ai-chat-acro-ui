# Web2 - AI聊天平台实验应用

<div align="center">
  <h3>🧪 技术探索与架构创新 - RxJS响应式编程实验</h3>
  
  ![Ant Design](https://img.shields.io/badge/Ant%20Design-5.27-blue)
  ![RxJS](https://img.shields.io/badge/RxJS-7.8-purple)
  ![React](https://img.shields.io/badge/React-19.0-blue)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
</div>

## ✨ 项目简介

Web2应用是AI Chat Acro UI项目的**实验性应用**，基于蚂蚁集团的Ant Design构建，专注于探索**RxJS响应式编程**、**类型化消息渲染系统**等前沿技术方案，为主应用提供技术储备和架构验证。

### 🎯 核心定位
- **技术验证平台** - 验证新架构和前沿技术
- **创新实验室** - 探索响应式编程模式
- **架构孵化器** - 为生产环境提供技术储备

### 💡 设计理念
> **"从后端AI Agent变化驱动的前端重构"**
> 
> 由于AI Agent和对话存储逻辑的演进，Web2应用重新设计了前端架构，采用更符合现代响应式编程的方式处理复杂的异步数据流。

## 🏗️ 技术架构

### 技术栈
```typescript
// 核心技术栈
React 19            // 用户界面框架
TypeScript 5.7      // 类型安全
Ant Design 5.27     // UI组件库 (蚂蚁集团)
RxJS 7.8           // 响应式编程
@ngify/http 2.0    // HTTP客户端
Styled Components  // CSS-in-JS
Rsbuild           // 现代化构建工具
```

### 架构创新
- **响应式编程**: RxJS Observable + 操作符管道
- **类型化渲染**: 基于消息类型的渲染器系统  
- **函数式设计**: 纯函数组件 + 不可变数据
- **管道式HTTP**: loadingOperator、errorOperator等

## 🚀 核心创新功能

### 🧠 AI思考过程可视化
- **Thinking展示**: 实时显示AI的思考过程
- **智能折叠**: 根据processing状态自动展开/折叠thinking内容
- **状态感知**: "Thinking" ↔ "Finish Think"动态状态显示
- **自定义渲染**: thinking内容使用不同的字体大小和颜色显示

### 🛠️ 工具调用状态管理
- **Tool状态跟踪**: "Tool Calling" ↔ "Tool Called"状态显示
- **处理状态感知**: 基于isProcessing参数的智能状态管理
- **视觉反馈**: 不同状态使用不同的图标和颜色

### 💬 对话标题显示
- **动态标题**: 聊天页面顶部显示当前对话标题
- **美观设计**: 渐变背景、glassmorphism效果
- **响应式布局**: 适配不同屏幕尺寸的标题显示

### 🔄 RxJS响应式编程
```typescript
// HTTP请求的响应式处理
const { loading, loadingOperator } = HttpLoading();

const loadMessages = (chatId: string) => {
  return http.get<MessageType[]>(`/chat/history/${chatId}`)
    .pipe(
      loadingOperator,                    // 自动loading管理
      map(response => response.data),     // 数据转换
      filter(messages => messages.length > 0), // 数据过滤
      catchError(err => {
        console.error('Load failed:', err);
        return of([]); // 失败时返回空数组
      }),
      finalize(() => console.log('Request completed'))
    )
    .subscribe({
      next: (messages) => setMessages(messages),
      error: (error) => handleError(error)
    });
};
```

**RxJS优势**:
- **声明式编程** - 描述数据如何变换，而非如何执行
- **组合性** - 操作符可以任意组合和重用
- **错误处理** - 统一的错误处理管道
- **内存管理** - 自动的订阅/取消订阅管理

### 🎭 类型化消息渲染系统
```typescript
// 消息渲染器类型定义
export type RenderersType<T> = Record<RoleType, RendererType<T>>;

export type RendererType<T> = {
  render: (content: T, id?: string) => ReactNode;
};

// 渲染器配置
const renderer: RenderersType<MessageType> = {
  [ROLE.query]: {
    render: (content, id) => (
      <UserMessage id={id}>
        {content.content}
      </UserMessage>
    )
  },
  [ROLE.response]: {
    render: (content, id) => {
      const reasoning = content.additional_kwargs.reasoning_content;
      
      return (
        <AIMessage id={id}>
          {reasoning && (
            <ThinkingSection>
              <ThinkingLabel>Thinking:</ThinkingLabel>
              <ThinkingContent>{reasoning}</ThinkingContent>
            </ThinkingSection>
          )}
          <ResponseContent>{content.content}</ResponseContent>
        </AIMessage>
      );
    }
  },
  [ROLE.tool]: {
    render: (content, id) => (
      <ToolMessage id={id}>
        Tool Calling: {content.name}
      </ToolMessage>
    )
  }
};
```

**渲染系统特性**:
- **类型安全** - 完整的TypeScript类型约束
- **可扩展性** - 轻松添加新的消息类型
- **组件化** - 每种类型独立的渲染逻辑
- **性能优化** - 按需渲染和虚拟化支持

### 📡 HTTP工具库
```typescript
// 自定义HTTP操作符
export const HttpLoading = () => {
  const [loading, setLoading] = useState(false);

  const loadingOperator = <T>(source: Observable<T>): Observable<T> => {
    setLoading(true);
    return source.pipe(
      catchError((err) => {
        setLoading(false);
        return throwError(() => err);
      }),
      finalize(() => setLoading(false))
    );
  };

  return { loading, setLoading, loadingOperator };
};
```

**HTTP工具特性**:
- **loadingOperator** - 自动loading状态管理
- **errorOperator** - 统一错误处理
- **retryOperator** - 重试机制
- **cacheOperator** - 响应缓存

## 📂 项目结构

```
src/
├── page/                    # 页面组件
│   ├── chat/               # 聊天功能模块
│   │   ├── layout/         # 聊天布局组件
│   │   │   ├── Chat.tsx    # 聊天主页面(包含thinking折叠、状态显示)
│   │   │   ├── ChatHome.tsx # 现代化聊天首页(渐变动画、特性卡片)
│   │   │   ├── ChatHistory.tsx # 聊天历史管理页面
│   │   │   └── ChatLayout.tsx # 聊天整体布局(侧边栏导航)
│   │   ├── renderer/       # 消息渲染系统
│   │   │   ├── MessageList.tsx     # 消息列表容器
│   │   │   ├── MessageRenderer.tsx # 消息渲染器
│   │   │   └── useMergeData.ts     # 数据合并Hook
│   │   ├── hooks/          # 聊天相关Hooks
│   │   │   ├── useChat.ts  # 聊天逻辑(流式响应、状态管理)
│   │   │   └── useHistory.tsx # 历史管理(CRUD操作)
│   │   ├── modal/          # 对话框组件
│   │   │   ├── DeleteChatModal.tsx # 删除对话确认弹窗
│   │   │   └── RenameModal.tsx     # 重命名对话弹窗
│   │   ├── Sender/         # 消息发送器
│   │   └── types/          # 类型定义
│   ├── home/               # 首页模块
│   └── sider/              # 侧边栏组件
├── routes/                 # 路由配置
├── store/                  # 状态管理
└── App.tsx                 # 应用入口
```

### 核心模块详解

#### 🎭 Renderer模块 (`src/page/chat/renderer/`)
**MessageRenderer.tsx** - 消息渲染核心
```typescript
export const MessageRenderer = <T,>(props: MessageRendererProps<T>) => {
  const { id, render, content } = props;
  const { onUpdate } = useContext(MessageRendererContext);

  useEffect(() => {
    onUpdate?.(); // 渲染更新通知
  }, [content]);

  return <div>{render ? render(content, id) : null}</div>;
};
```

**MessageList.tsx** - 消息列表容器
```typescript
export const MessageList = <T extends { id?: string }>(
  props: MessageListProps<T>
) => {
  const { messages, renderer } = props;
  const { mergedData } = useMergeData({ messages, renderer });

  return (
    <MessageRendererContext.Provider value={{ onUpdate }}>
      <MessageListWrapper>
        {mergedData.map((data, i) => (
          <MessageRenderer<T>
            key={i}
            id={data.message.id ?? String(i)}
            render={data.render}
            content={data.message}
          />
        ))}
      </MessageListWrapper>
    </MessageRendererContext.Provider>
  );
};
```

#### 📡 Hooks模块 (`src/page/chat/hooks/`)
**useHistory.tsx** - 历史记录管理
```typescript
export const useHistory = () => {
  const [chats, setChats] = useState<ChatType[]>([]);

  const createChat = (title?: string): ChatType => {
    const newChat: ChatType = {
      title: title ?? "Untitled",
      id: v4(),
      createTime: dayjs().toISOString(),
      updateTime: dayjs().toISOString(),
    };
    
    const newChats = [...chats, newChat];
    setChats(newChats);
    localStorage.setItem(LocalStorageKey, JSON.stringify(newChats));
    
    return newChat;
  };

  return { chats, createChat };
};
```

## 🛠️ 开发指南

### 环境准备
```bash
# 进入web2应用目录
cd apps/web2

# 安装依赖 (如果还未安装)
pnpm install
```

### 开发命令
```bash
# 启动开发服务器
pnpm dev

# 生产构建
pnpm build

# 预览构建结果
pnpm preview

# 部署到GitHub Pages
pnpm deploy
```

### 开发约定

#### RxJS编程模式
```typescript
// 推荐的RxJS使用模式
const useRxJSData = (source$: Observable<Data>) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscription = source$
      .pipe(
        tap(() => setLoading(true)),
        catchError(err => {
          console.error(err);
          return of(null);
        }),
        finalize(() => setLoading(false))
      )
      .subscribe(setData);

    return () => subscription.unsubscribe(); // 清理订阅
  }, [source$]);

  return { data, loading };
};
```

#### 消息渲染器开发
```typescript
// 添加新的消息类型渲染器
const newRenderer: RendererType<MessageType> = {
  render: (content, id) => {
    // 自定义渲染逻辑
    return (
      <CustomMessageWrapper id={id}>
        <MessageHeader>{content.type}</MessageHeader>
        <MessageBody>{content.content}</MessageBody>
      </CustomMessageWrapper>
    );
  }
};

// 注册到渲染器配置中
const renderer: RenderersType<MessageType> = {
  ...existingRenderers,
  [ROLE.custom]: newRenderer
};
```

#### Ant Design使用
```typescript
// 使用Ant Design组件
import { Button, Card, Space, Typography } from 'antd';
import { MessageOutlined, SendOutlined } from '@ant-design/icons';

const ChatComponent: React.FC = () => {
  return (
    <Card
      title={<Space><MessageOutlined />聊天</Space>}
      extra={<Button type="primary" icon={<SendOutlined />}>发送</Button>}
    >
      <Typography.Paragraph>
        这是使用Ant Design构建的聊天界面
      </Typography.Paragraph>
    </Card>
  );
};
```

## 🧪 实验性功能

### 1. 响应式数据流管理
```typescript
// 使用RxJS Subject进行状态管理
export class ChatStore {
  private messagesSubject = new BehaviorSubject<MessageType[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  addMessage(message: MessageType) {
    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, message]);
  }

  clearMessages() {
    this.messagesSubject.next([]);
  }
}
```

### 2. 操作符组合实验
```typescript
// 复杂的操作符组合
const complexDataFlow = (source$: Observable<RawData>) => 
  source$.pipe(
    debounceTime(300),              // 防抖
    distinctUntilChanged(),         // 去重
    switchMap(data => 
      processData(data).pipe(
        retry(3),                   // 重试3次
        timeout(5000),              // 5秒超时
        catchError(() => of(null))  // 失败处理
      )
    ),
    filter(result => result !== null), // 过滤空值
    shareReplay(1)                 // 共享最新值
  );
```

### 3. 类型安全的渲染系统
```typescript
// 严格的类型约束
interface TypedMessage<T extends string = string> {
  type: T;
  content: string;
  id: string;
}

type MessageRenderers<T extends TypedMessage> = {
  [K in T['type']]: RendererType<Extract<T, { type: K }>>;
};

// 使用示例
type SupportedMessages = 
  | TypedMessage<'user'>
  | TypedMessage<'assistant'>
  | TypedMessage<'tool'>;

const typedRenderers: MessageRenderers<SupportedMessages> = {
  user: { render: (msg) => <UserMessage>{msg.content}</UserMessage> },
  assistant: { render: (msg) => <AIMessage>{msg.content}</AIMessage> },
  tool: { render: (msg) => <ToolMessage>{msg.content}</ToolMessage> }
};
```

## 📊 实验结果与洞察

### 性能对比
> **注意**: 以下对比基于理论分析和小规模测试，尚未进行大规模性能基准测试。

| 指标 | Web (传统方式) | Web2 (RxJS方式) | 预期优势 |
|------|--------------|----------------|---------|
| **内存使用** | 基线 | 待测试 | 🔄 更好的内存管理 |
| **响应速度** | 基线 | 待测试 | 🔄 更快的数据处理 |
| **代码复用** | 基线 | 更高 | ✅ 更高的复用性 |
| **错误处理** | 分散式 | 统一式 | ✅ 更好的维护性 |

### 技术洞察
1. **RxJS优势** - 在复杂异步场景下表现优异
2. **类型安全** - 编译时捕获更多潜在错误
3. **组合能力** - 操作符的组合带来强大的表达力
4. **学习成本** - 需要团队投入时间学习响应式编程

## 🔄 技术迁移计划

### 已验证成功的技术
- 🧪 **RxJS HTTP处理** - 基础架构已实现，待深度验证
- ✅ **类型化渲染系统** - 已实现并验证类型安全性
- ✅ **函数式组件设计** - 更好的测试性和复用性

### 计划迁移到主应用
```typescript
// 迁移路径
Web2实验验证 → 性能基准测试 → 逐步迁移到Web主应用

// 迁移优先级
1. HTTP工具库 (loadingOperator等)
2. 类型化渲染系统
3. RxJS状态管理 (部分场景)
```

### 风险评估
- **学习成本** - 团队需要掌握RxJS概念
- **调试复杂度** - Observable调试比Promise稍复杂
- **生态兼容性** - 需要评估与现有工具的兼容性

## 📈 未来实验方向

### 短期实验 (1-2月)
- **虚拟化滚动** - 大量消息的性能优化
- **Web Workers** - 后台数据处理
- **ServiceWorker缓存** - 离线功能支持

### 中期实验 (3-6月)  
- **微前端集成** - 模块联邦技术
- **WebRTC集成** - 实时语音/视频功能
- **AI流式处理优化** - 更流畅的打字效果

### 长期愿景 (6月+)
- **响应式架构标准** - 形成团队开发规范
- **工具链优化** - 开发专用的调试工具
- **性能基准库** - 建立性能测试标准

## 🤝 贡献指南

### 实验性功能开发
1. **假设验证** - 明确要验证的技术假设
2. **小范围实现** - 先在局部功能中验证
3. **性能测试** - 对比传统实现的性能差异
4. **文档记录** - 详细记录实验过程和结果

### 代码规范
- **RxJS优先** - 新功能优先使用RxJS实现
- **类型完整性** - 确保完整的TypeScript类型覆盖
- **函数式编程** - 避免副作用，使用纯函数
- **可观测性** - 添加充分的日志和监控

## 🆕 最新更新 (2024)

### ✨ 新增功能
- **🧠 AI思考过程可视化**: thinking内容智能展开/折叠，支持自定义渲染样式
- **🛠️ 工具调用状态管理**: 实时显示Tool Calling/Called状态
- **💬 对话标题显示**: 页面顶部美观的对话标题栏，支持渐变背景
- **📱 现代化ChatHome**: 重新设计的首页，包含特性介绍和动画效果
- **🎨 MDRenderer增强**: 支持fontSize、textColor、lineHeight等自定义参数

### 🔧 技术改进
- **状态管理优化**: 修复React状态闭包问题，使用函数式更新
- **isProcessing字段**: 新增消息处理状态追踪
- **智能UI响应**: thinking栏根据处理状态自动展开/折叠
- **样式系统完善**: 更好的响应式设计和视觉效果

---

<div align="center">
  <p>🧪 Web2是我们的技术实验室，探索AI应用开发的未来可能性！</p>
</div>
