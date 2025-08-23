# AI Chat Acro UI

<div align="center">
  <h3>🚀 现代化AI对话平台 - 基于React + TypeScript的智能聊天应用</h3>
  
  ![React](https://img.shields.io/badge/React-18.3-blue)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
  ![Arco Design](https://img.shields.io/badge/Arco%20Design-2.65-green)
  ![RxJS](https://img.shields.io/badge/RxJS-7.8.2-purple)
  ![Ant Design](https://img.shields.io/badge/Ant%20Design-Latest-cyan)
  ![pnpm](https://img.shields.io/badge/pnpm-Monorepo-orange)
  
  ![Version](https://img.shields.io/badge/Version-1.0.0-success)
  ![Status](https://img.shields.io/badge/Status-Active%20Development-brightgreen)
  ![License](https://img.shields.io/badge/License-MIT-informational)
</div>

## ✨ 项目简介

AI Chat Acro UI 是一个现代化的AI对话平台，支持多模型聊天、项目管理、实时流式响应等功能。项目采用Monorepo架构，提供了两套独立的UI实现方案。

### 🎯 核心特性

- **🤖 多模型支持** - 集成阿里百炼平台，支持DeepSeek-R1等先进AI模型
- **💬 实时流式对话** - 基于EventSource的实时响应显示，支持思考过程可视化
- **🧠 AI思考展示** - 智能折叠thinking内容，根据处理状态自动展开/收起
- **🛠️ 工具调用跟踪** - 实时显示Tool Calling/Called状态，完整的工具调用流程
- **📁 项目管理** - 聊天项目组织、历史记录管理、重命名删除操作、批量删除功能
- **⭐ 收藏系统** - 支持聊天收藏，收藏状态实时同步，优雅的错误处理机制
- **🔍 智能搜索** - 基于RxJS的响应式搜索，支持本地过滤和远程API搜索的混合策略
- **🔒 Token认证** - 完整的Token认证拦截器系统，自动处理授权和过期刷新
- **🎨 现代化UI** - 支持深色/浅色主题，响应式设计，glassmorphism效果
- **🔧 组件化架构** - 高度可复用的组件设计，支持自定义渲染参数
- **📡 RxJS深度集成** - 函数式响应编程，优雅处理异步数据流，防抖搜索，错误处理
- **🏗️ Monorepo结构** - 多应用共享组件和工具库

## 🏗️ 项目架构

```text
ai-chat-acro-ui/
├── apps/                          # 应用层
│   ├── web/                       # 主应用 (Arco Design)
│   │   ├── src/
│   │   │   ├── page/chat/         # 聊天功能模块
│   │   │   ├── page/home/         # 首页模块
│   │   │   ├── hooks/             # 自定义Hooks
│   │   │   └── store.ts           # Zustand状态管理
│   │   └── rsbuild.config.ts      # 构建配置
│   └── web2/                      # 次应用 (Ant Design)
│       ├── src/
│       │   ├── page/chat/         # 聊天功能模块
│       │   │   ├── layout/        # 聊天布局组件
│       │   │   ├── renderer/      # 消息渲染系统
│       │   │   └── hooks/         # 聊天相关Hooks
│       │   └── routes/            # 路由配置
│       └── rsbuild.config.ts
├── packages/                      # 共享包
│   ├── components/                # 通用组件库
│   │   ├── bubble/                # 对话气泡组件
│   │   ├── markdown/              # Markdown渲染器
│   │   └── popover/               # 弹出框组件
│   ├── theme/                     # 主题系统
│   └── utils/                     # 工具库
│       ├── axios/                 # HTTP请求封装
│       └── http/                  # RxJS HTTP工具
└── CLAUDE.md                      # 项目开发指南
```

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/qtcyy/ai-chat-acro-ui.git
cd ai-chat-acro-ui

# 安装依赖
pnpm install
```

### 启动开发服务器

```bash
# 启动主应用 (web)
pnpm dev:web

# 启动次应用 (web2)
pnpm dev:web2

# 构建整个项目
pnpm build
```

### 部署

```bash
# 进入对应应用目录
cd apps/web  # 或 apps/web2

# 构建生产版本
pnpm build

# 部署到GitHub Pages
pnpm deploy
```

## 🛠️ 技术栈

### 前端框架
- **React 19** - 用户界面构建
- **TypeScript** - 类型安全
- **React Router DOM** - 路由管理

### UI组件库
- **Arco Design** (主应用) - 字节跳动企业级设计语言
- **Ant Design** (次应用) - 蚂蚁集团企业级UI设计

### 状态管理
- **Zustand** - 轻量级状态管理
- **RxJS** - 响应式编程

### 样式方案
- **Tailwind CSS** - 原子化CSS框架
- **Styled Components** - CSS-in-JS解决方案

### 构建工具
- **Rsbuild** - 现代化构建工具
- **pnpm Workspace** - Monorepo包管理

### 开发工具
- **ESLint + Prettier** - 代码规范
- **TypeScript** - 静态类型检查

## 🎨 核心功能模块

### 1. 聊天系统 (`apps/web/src/page/chat/`)

- **实时对话** - 支持流式响应，思考过程可视化
- **项目管理** - 聊天会话的项目化组织
- **历史记录** - 完整的对话历史管理
- **多模态支持** - 文本、代码、数学公式渲染

```typescript
// 核心聊天Hook示例
const { sendMessage, messages, loading } = useChat({
  apiUrl: 'https://dashscope.aliyuncs.com',
  model: 'deepseek-r1',
  streaming: true
});
```

### 2. 消息渲染系统 (`apps/web2/src/page/chat/renderer/`)

- **类型化渲染** - 基于消息类型的差异化渲染
- **RxJS集成** - 响应式数据流处理
- **组件化设计** - 高度可复用的渲染器架构

```typescript
// 消息渲染器配置示例
const renderer: RenderersType<MessageType> = {
  query: { render: (content) => <UserMessage>{content.text}</UserMessage> },
  response: { render: (content) => <AIMessage>{content.text}</AIMessage> },
  tool: { render: (content) => <ToolMessage>{content.result}</ToolMessage> }
};
```

### 3. HTTP工具库 (`packages/utils/src/http/`)

- **RxJS HTTP客户端** - 基于@ngify/http的响应式HTTP处理
- **自动Loading管理** - loadingOperator操作符
- **错误处理** - 统一的错误拦截和处理
- **请求上传** - 文件上传和进度跟踪
- **Token拦截器** - 自动Token注入和刷新机制

```typescript
// HTTP工具使用示例
const { loading, loadingOperator } = HttpLoading();

http.get<MessageType[]>(`/chat/history/${chatId}`)
  .pipe(loadingOperator)
  .subscribe({
    next: (messages) => setMessages(messages),
    error: (err) => handleError(err)
  });
```

### 4. 响应式搜索系统 (`apps/web2/src/page/chat/hooks/useHistory.tsx`)

- **RxJS驱动搜索** - 基于BehaviorSubject的响应式搜索流
- **防抖优化** - 300ms防抖，避免频繁API调用
- **混合搜索策略** - 本地过滤 + 远程API的智能切换
- **错误恢复** - 远程搜索失败时自动降级到本地搜索

```typescript
// 响应式搜索实现示例
const [filteredChats$] = useState(() =>
  combineLatest([
    searchQuery$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ),
    chats$
  ]).pipe(
    switchMap(([query, currentChats]) => {
      if (!query) return of(currentChats);
      
      // 本地过滤
      const localResults = currentChats.filter(chat =>
        chat.title.toLowerCase().includes(query.toLowerCase())
      );
      
      // 结果不足时进行远程搜索
      if (localResults.length < 3) {
        return searchChats(query).pipe(
          map(remoteResults => mergeResults(localResults, remoteResults)),
          catchError(() => of(localResults))
        );
      }
      
      return of(localResults);
    }),
    shareReplay(1)
  )
);
```

### 5. 收藏功能系统 (`apps/web2/src/page/chat/layout/ChatHistory.tsx`)

- **响应式收藏操作** - 基于Observable的收藏状态管理
- **乐观更新** - 立即更新UI，后续同步服务端状态
- **错误处理** - 分层错误处理，用户友好的错误提示
- **状态同步** - 收藏操作后自动刷新聊天详情

```typescript
// 收藏功能实现示例
const handleToggleStar = (id: UUIDTypes) => {
  toggleStarChat(id).subscribe({
    next(value) {
      if (value) {
        message.success("收藏成功");
        getOneChat(id); // 同步最新状态
      } else {
        message.error("收藏失败");
      }
    },
    error(err) {
      console.error("收藏操作失败:", err);
      message.error("网络错误，请稍后重试");
    }
  });
};
```

## 📦 包管理

项目采用pnpm Workspace进行包管理，支持以下工作区：

```json
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

### 添加依赖

```bash
# 为特定应用添加依赖
pnpm -F web add lodash
pnpm -F web2 add antd

# 为共享包添加依赖
pnpm -F utils add axios
pnpm -F components add react-icons

# 添加根依赖
pnpm add -w typescript
```

## 🔧 配置说明

### 环境变量

创建 `.env.local` 文件：

```env
# API配置
VITE_API_BASE_URL=https://dashscope.aliyuncs.com
VITE_API_KEY=your_api_key_here

# 应用配置
VITE_APP_TITLE=AI Chat Platform
VITE_APP_VERSION=1.0.0
```

### 构建配置

项目使用Rsbuild进行构建，主要配置位于：

- `apps/web/rsbuild.config.ts` - 主应用构建配置
- `apps/web2/rsbuild.config.ts` - 次应用构建配置

## 🧪 开发指南

### Git工作流

项目采用GitFlow工作流：

- `main` - 生产分支
- `ws` - 集成测试分支
- `ws(themed)` - 功能开发分支

```bash
# 创建新功能分支
git checkout -b feature/new-feature ws(themed)

# 开发完成后合并到ws分支
git checkout ws
git merge feature/new-feature

# 测试通过后合并到main分支
git checkout main
git merge ws
```

### 代码规范

- 使用TypeScript进行类型检查
- 遵循React Hooks最佳实践
- 组件采用函数式编程风格
- 使用RxJS处理复杂异步逻辑
- Observable命名约定：以$结尾 (如: `filteredChats$`, `searchQuery$`)
- 错误处理：优先使用catchError操作符，提供用户友好的降级策略

## 📚 学习资源

### RxJS集成指南

项目深度集成了RxJS，提供了完整的学习文档：

- **[RxJS全面学习指南](apps/web2/claude_doc/rxjs-comprehensive-guide.md)** - 从基础到高级的完整RxJS教程
- **[RxJS与React集成](apps/web2/claude_doc/rxjs-comprehensive-guide.md#⚛️-rxjs-与-react-集成)** - 详细的React集成模式和最佳实践
- **[响应式搜索系统实现](apps/web2/claude_doc/rxjs-search-system.md)** - 搜索系统的具体实现案例

### 关键概念示例

```typescript
// BehaviorSubject用于状态管理
const searchQuery$ = new BehaviorSubject<string>("");

// combineLatest用于多流合并
const filteredData$ = combineLatest([searchQuery$, data$]).pipe(
  debounceTime(300),
  switchMap(([query, data]) => filterData(query, data)),
  shareReplay(1)
);

// React组件中使用Observable
function useObservable<T>(observable$: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState<T>(initialValue);
  
  useEffect(() => {
    const subscription = observable$.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [observable$]);
  
  return value;
}
```

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- [Arco Design](https://arco.design/) - UI组件库
- [Ant Design](https://ant.design/) - UI组件库
- [RxJS](https://rxjs.dev/) - 响应式编程库
- [阿里云百炼平台](https://dashscope.aliyuncs.com/) - AI API服务

## 📞 联系方式

- 项目维护者: [@qtcyy](https://github.com/qtcyy)
- 问题反馈: [Issues](https://github.com/qtcyy/ai-chat-acro-ui/issues)

---

<div align="center">
  <p>⭐ 如果这个项目对你有帮助，请给它一个星标！</p>
</div>