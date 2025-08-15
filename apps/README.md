# Apps - 应用层目录

<div align="center">
  <h3>🎯 多应用架构设计 - 双UI实现方案</h3>
</div>

本目录包含项目的所有前端应用，采用多应用并行开发的策略，提供不同的UI框架实现方案。

## 📱 应用架构概览

```
apps/
├── web/                    # 主应用 (生产环境)
│   ├── Arco Design UI     # 字节跳动企业级设计语言  
│   ├── 完整功能实现       # 聊天、项目管理、用户系统
│   └── Zustand状态管理    # 轻量级状态管理方案
└── web2/                   # 次应用 (实验性)
    ├── Ant Design UI      # 蚂蚁集团企业级UI设计
    ├── RxJS响应式编程     # 函数式编程范式
    └── 新架构验证         # 消息渲染系统、HTTP工具库
```

## 🚀 应用详情

### 📦 Web (主应用)
> **技术栈**: React 19 + Arco Design + Zustand + Rsbuild

**🎯 定位**: 生产环境主力应用，功能完整，性能稳定

**✨ 核心特性**:
- **🤖 完整的AI聊天功能** - 支持多模型、流式响应、思考过程可视化
- **📁 项目管理系统** - 聊天会话的项目化组织和管理
- **👤 用户认证系统** - 完整的登录、注册、权限管理
- **🎨 主题系统** - 深色/浅色主题切换，个性化设置
- **📊 仪表盘** - 数据统计和可视化展示

**🏗️ 架构亮点**:
```typescript
// Zustand状态管理示例
export const useStore = create<StoreState>((set, get) => ({
  // 用户状态
  user: null,
  // 聊天状态
  messages: [],
  // UI状态
  theme: 'light',
  // 动作方法
  setUser: (user) => set({ user }),
  addMessage: (message) => set(state => ({ 
    messages: [...state.messages, message] 
  }))
}));
```

**🌟 功能模块**:
- `page/chat/` - 聊天核心功能
- `page/home/` - 首页和仪表盘
- `page/register/` - 用户注册系统
- `page/ui/` - UI组件展示页面
- `hooks/` - 自定义业务Hooks

### 🧪 Web2 (实验应用)
> **技术栈**: React 19 + Ant Design + RxJS + HttpClient

**🎯 定位**: 技术验证和新架构探索，前沿功能实验

**🚀 创新特性**:
- **🔄 RxJS响应式编程** - 函数式数据流处理
- **🎭 类型化消息渲染系统** - 基于消息类型的差异化渲染
- **📡 HTTP工具库** - loadingOperator、错误拦截器等
- **🧩 组件化架构** - 高度可复用的渲染器设计

**💡 技术亮点**:
```typescript
// RxJS + HTTP工具库示例
const { loading, loadingOperator } = HttpLoading();

http.get<MessageType[]>(`/chat/history/${chatId}`)
  .pipe(
    loadingOperator,                    // 自动loading管理
    map(response => response.data),     // 数据转换
    catchError(err => of([]))          // 错误处理
  )
  .subscribe({
    next: (messages) => setMessages(messages),
    error: (err) => handleError(err)
  });
```

**🏗️ 架构创新**:
- **消息渲染器系统** - `renderer/MessageRenderer.tsx`
- **类型化渲染配置** - `RenderersType<T>`
- **HTTP操作符** - `loadingOperator`、`errorOperator`
- **函数式组件设计** - 纯函数式编程风格

## 🛠️ 开发命令

### 快速启动
```bash
# 启动主应用 (推荐用于日常开发)
pnpm dev:web

# 启动实验应用 (用于新功能验证)
pnpm dev:web2
```

### 单独操作
```bash
# 进入应用目录
cd apps/web   # 或 apps/web2

# 开发模式
pnpm dev

# 生产构建
pnpm build

# 部署到GitHub Pages
pnpm deploy
```

## 📊 应用对比

| 特性 | Web (主应用) | Web2 (实验应用) |
|------|------------|---------------|
| **UI框架** | Arco Design | Ant Design |
| **状态管理** | Zustand | 局部State + RxJS |
| **HTTP处理** | Axios + Hooks | RxJS HttpClient |
| **开发成熟度** | ✅ 生产就绪 | 🧪 实验阶段 |
| **功能完整度** | 🌟 完整 | 🚧 部分实现 |
| **架构创新** | 🔄 传统稳定 | 🚀 前沿探索 |

## 🎯 开发策略

### 主应用 (Web)
- **稳定优先** - 确保生产环境稳定性
- **功能导向** - 快速实现业务需求
- **用户体验** - 优化交互和性能

### 实验应用 (Web2)
- **技术验证** - 探索新的架构模式
- **创新实验** - 尝试前沿技术方案
- **经验积累** - 为主应用提供技术储备

## 🔄 技术迁移

当Web2中的新技术验证成功后，会逐步迁移到主应用：

```bash
# 技术迁移流程
Web2 (实验) → 验证成功 → 集成到Web (生产)
```

**已成功迁移的技术**:
- ✅ Styled Components
- ✅ TypeScript严格模式
- ✅ 组件化设计模式

**计划迁移的技术**:
- 🔄 RxJS响应式编程
- 🔄 类型化消息渲染系统
- 🔄 HTTP工具库

## 📈 未来规划

### 短期目标
- **Web2功能补全** - 完善聊天功能实现
- **性能优化** - 两个应用的性能基准测试
- **技术总结** - 形成最佳实践文档

### 长期愿景
- **架构统一** - 融合两个应用的优势
- **技术标准化** - 建立统一的开发规范
- **插件化架构** - 支持功能模块的热插拔

---

<div align="center">
  <p>🎉 通过双应用并行开发，我们能够在保持生产稳定的同时，持续探索技术前沿！</p>
</div>
