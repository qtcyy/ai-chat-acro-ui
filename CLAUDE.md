# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo using pnpm workspaces with two main applications:
- `apps/web/` - Main AI chat application using Arco Design React components
- `apps/web2/` - Secondary application using Ant Design components  
- `packages/` - Shared workspace packages (components, utils, theme)

## Development Commands

### Root Level Commands
```bash
# Start main web app
pnpm dev:web

# Start secondary web2 app  
pnpm dev:web2

# Build entire monorepo
pnpm build
```

### App-Specific Commands
```bash
# Navigate to apps/web or apps/web2 and run:
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm deploy       # Deploy to GitHub Pages
```

## Architecture Overview

### Main Application (apps/web)
- **Build Tool**: Rsbuild with React plugin
- **UI Framework**: Arco Design React (@arco-design/web-react)
- **State Management**: Zustand (store.ts)
- **Routing**: React Router DOM with lazy loading
- **Styling**: Tailwind CSS + styled-components
- **AI Integration**: Alibaba DashScope API for chat completions

### Key Architecture Patterns
- **Chat System**: Stream-based AI responses using fetchEventSource
- **State Structure**: Global store in `src/store.ts` with chat state, user session, and UI controls
- **Route Structure**: Nested routes with lazy loading for better performance
- **Component Organization**: Feature-based folders under `src/page/`

### Core Features
- AI chat interface with project management
- Real-time streaming responses with thinking/reasoning display
- User authentication and session management
- Chat history and project organization
- Settings and appearance customization

### API Integration
- Primary AI API: Alibaba DashScope (https://dashscope.aliyuncs.com)
- Default model: deepseek-r1
- Stream processing with math rendering (KaTeX) and markdown support

### Important Files
- `src/routes.tsx` - Main application routing configuration
- `src/store.ts` - Global state management with Zustand
- `src/page/chat/hooks/useChat.ts` - Core chat functionality and API integration
- `src/page/chat/layout/` - Main chat interface components
- `rsbuild.config.ts` - Build configuration with asset prefix for GitHub Pages

### Workspace Dependencies
Both apps depend on shared packages:
- `components` - Shared UI components
- `utils` - Utility functions
- `theme` - Styling and theming
- project web is end, i'll code web2 in the next time