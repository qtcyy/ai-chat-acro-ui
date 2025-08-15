# Web - AI聊天平台主应用

<div align="center">
  <h3>🚀 生产级AI对话平台 - 企业级解决方案</h3>
  
  ![Arco Design](https://img.shields.io/badge/Arco%20Design-2.65-blue)
  ![Zustand](https://img.shields.io/badge/Zustand-5.0-green)
  ![React](https://img.shields.io/badge/React-19.0-blue)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
</div>

## ✨ 项目简介

Web应用是AI Chat Acro UI项目的**生产级主应用**，基于字节跳动的Arco Design构建，提供完整的AI对话、项目管理、用户系统等企业级功能。

### 🎯 核心定位
- **生产环境就绪** - 稳定可靠，支持大规模用户使用
- **功能完整性** - 涵盖AI聊天的完整业务流程
- **企业级体验** - 专业的UI设计和交互体验

## 🏗️ 技术架构

### 技术栈
```typescript
// 核心技术栈
React 19          // 用户界面框架
TypeScript 5.7    // 类型安全
Arco Design 2.65  // UI组件库 (字节跳动)
Zustand 5.0       // 状态管理
React Router 7    // 路由管理
Rsbuild          // 现代化构建工具
```

### 架构模式
- **状态管理**: Zustand - 轻量级、类型安全的状态管理
- **组件架构**: 功能模块化 + 共享组件库
- **路由设计**: 嵌套路由 + 懒加载优化
- **数据流**: 单向数据流 + 事件驱动

## 🌟 核心功能

### 🤖 AI聊天系统
```typescript
// 核心聊天功能
const useChat = () => {
  const { messages, sendMessage, isStreaming } = useChatStore();
  
  // 流式响应处理
  const handleStream = async (message: string) => {
    const stream = await fetchEventSource('/api/chat/stream', {
      method: 'POST',
      body: JSON.stringify({ message, model: 'deepseek-r1' })
    });
    
    // 实时更新UI
    stream.onMessage((data) => {
      updateStreamMessage(data.content);
    });
  };
};
```

**特性亮点**:
- **多模型支持** - DeepSeek-R1等阿里百炼平台AI模型
- **流式响应** - 实时显示AI思考和回答过程
- **思考过程可视化** - 展示AI的reasoning过程
- **数学公式渲染** - 支持KaTeX数学公式显示
- **代码高亮** - 语法高亮和代码复制功能
- **Markdown渲染** - 完整的Markdown支持

### 📁 项目管理系统
```typescript
// 项目管理状态
interface ProjectState {
  currentProject: Project | null;
  projects: Project[];
  createProject: (name: string) => void;
  switchProject: (id: string) => void;
  setInstruction: (instruction: string) => void;
}
```

**功能特性**:
- **项目组织** - 按项目分组管理聊天会话
- **自定义指令** - 为每个项目设置专属AI指令
- **项目切换** - 快速在不同项目间切换
- **数据持久化** - 本地存储 + 云端同步

### 👤 用户认证系统
- **注册登录** - 完整的用户注册和登录流程
- **权限管理** - 基于角色的访问控制
- **个人设置** - 用户偏好和配置管理
- **安全机制** - JWT令牌 + 刷新机制

### 🎨 主题和外观
```typescript
// 主题系统
const useTheme = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return { theme, toggleTheme };
};
```

- **深色/浅色主题** - 完整的主题切换支持
- **响应式设计** - 适配桌面端和移动端
- **自定义配色** - 可配置的品牌色彩
- **动画效果** - 流畅的过渡动画

## 📂 项目结构

```
src/
├── page/                    # 页面组件
│   ├── chat/               # 聊天功能模块
│   │   ├── layout/         # 聊天布局
│   │   ├── Sender/         # 消息发送器
│   │   ├── history/        # 聊天历史
│   │   ├── Projects/       # 项目管理
│   │   ├── login/          # 登录功能
│   │   ├── setting/        # 设置页面
│   │   └── hooks/          # 聊天相关Hooks
│   ├── home/               # 首页模块
│   ├── register/           # 注册模块
│   └── ui/                 # UI组件展示
├── hooks/                  # 全局Hooks
├── store.ts               # Zustand全局状态
├── routes.tsx             # 路由配置
└── App.tsx                # 应用入口
```

### 核心模块详解

#### 📱 Chat模块 (`src/page/chat/`)
- **Layout** - 聊天主界面布局和侧边栏
- **Sender** - 消息输入和发送组件
- **Projects** - 项目创建、编辑、删除管理
- **History** - 聊天记录的展示和管理
- **Hooks** - `useChat`、`useProject`等业务逻辑

#### 🏠 Home模块 (`src/page/home/`)
- **Dashboard** - 数据统计和可视化
- **HomePage** - 应用首页和导航

#### 👤 Register模块 (`src/page/register/`)
- **注册流程** - 用户注册表单和验证
- **UI组件** - 专门的注册页面UI设计

## 🛠️ 开发指南

### 环境准备
```bash
# 进入web应用目录
cd apps/web

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

#### 组件开发
```typescript
// 组件文件结构
interface ComponentProps {
  // 明确的属性类型定义
}

export const Component: React.FC<ComponentProps> = (props) => {
  // 使用Arco Design组件
  return (
    <Card>
      <Button type="primary">Arco Button</Button>
    </Card>
  );
};
```

#### 状态管理
```typescript
// 使用Zustand进行状态管理
export const useStore = create<StoreState>((set, get) => ({
  // 状态
  data: null,
  loading: false,
  
  // 动作
  setData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  
  // 异步动作
  fetchData: async () => {
    set({ loading: true });
    try {
      const data = await api.getData();
      set({ data, loading: false });
    } catch (error) {
      set({ loading: false });
      // 错误处理
    }
  }
}));
```

#### 路由配置
```typescript
// 懒加载路由配置
export const routes: RouteObject[] = [
  {
    path: "/chat",
    element: <ChatLayout />,
    children: [
      {
        index: true,
        element: <ChatHome />
      },
      {
        path: "project/:projectId",
        element: <ProjectChat />
      }
    ]
  }
];
```

## 🚀 部署说明

### 构建配置
项目使用Rsbuild进行构建，配置文件位于 `rsbuild.config.ts`：

```typescript
export default defineConfig({
  html: {
    template: './public/index.html',
  },
  output: {
    assetPrefix: '/ai-chat-acro-ui/', // GitHub Pages路径
  },
  plugins: [
    pluginReact(),
    pluginSvgr(),
  ],
});
```

### GitHub Pages部署
```bash
# 自动构建并部署
pnpm deploy

# 访问地址
# https://qtcyy.github.io/ai-chat-acro-ui/
```

## 📊 性能优化

### 代码分割
```typescript
// 路由级别的代码分割
const ChatPage = lazy(() => import('./page/chat/Chat'));
const HomePage = lazy(() => import('./page/home/HomePage'));

// 组件级别的懒加载
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));
```

### Bundle分析
```bash
# 使用rsbuild内置的bundle分析
pnpm build --analyze
```

### 性能监控
- **Lighthouse评分**: 定期进行性能评估
- **Core Web Vitals**: 关注用户体验指标
- **Bundle大小**: 控制JavaScript包体积

## 🧪 测试策略

### 单元测试
```typescript
// 使用Jest + Testing Library
import { render, screen } from '@testing-library/react';
import { ChatMessage } from './ChatMessage';

test('renders chat message correctly', () => {
  render(<ChatMessage content="Hello World" type="user" />);
  expect(screen.getByText('Hello World')).toBeInTheDocument();
});
```

### E2E测试
```typescript
// 使用Playwright进行端到端测试
test('chat flow works correctly', async ({ page }) => {
  await page.goto('/chat');
  await page.fill('[data-testid=message-input]', 'Hello AI');
  await page.click('[data-testid=send-button]');
  await expect(page.locator('.ai-response')).toBeVisible();
});
```

## 📈 未来规划

### 短期目标 (1-2月)
- **性能优化** - 提升首屏加载速度
- **移动端适配** - 完善响应式设计
- **PWA支持** - 添加离线功能

### 中期目标 (3-6月)
- **插件系统** - 支持功能插件扩展
- **多语言支持** - 国际化功能
- **高级功能** - 文件上传、图片分析

### 长期愿景 (6月+)
- **微前端架构** - 模块化部署
- **AI助手定制** - 个性化AI角色
- **企业版功能** - 团队协作、数据分析

## 🤝 贡献指南

### 开发流程
1. **功能开发** - 在`ws(themed)`分支进行功能开发
2. **测试验证** - 确保功能正常和测试覆盖
3. **代码审查** - 提交Pull Request进行代码审查
4. **合并发布** - 合并到`main`分支并发布

### 编码规范
- **TypeScript优先** - 所有组件使用TypeScript
- **Arco Design组件** - 优先使用Arco Design组件
- **Hooks模式** - 使用函数式组件和Hooks
- **状态管理** - 使用Zustand管理应用状态

---

<div align="center">
  <p>🎉 Web应用是我们的生产力工具，让AI对话变得简单而强大！</p>
</div>