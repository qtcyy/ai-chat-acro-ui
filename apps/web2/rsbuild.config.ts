import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      'process.env.REACT_APP_CHAT_MANAGE_BACKEND': JSON.stringify(process.env.REACT_APP_CHAT_MANAGE_BACKEND),
      'process.env.REACT_APP_CHATBOT_BACKEND': JSON.stringify(process.env.REACT_APP_CHATBOT_BACKEND),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
    include: [/[\\/]node_modules[\\/]/],
  },
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://ark.cn-beijing.volces.com",
  //       changeOrigin: true,
  //       pathRewrite: { "^/api": "/api/v3/chat/completions" },
  //       // 添加以下配置以支持流式传输
  //       secure: false,
  //       ws: true, // 支持 websocket
  //       headers: {
  //         Connection: "keep-alive",
  //         "Cache-Control": "no-cache",
  //         "Accept-Encoding": "gzip, deflate, br",
  //       },
  //     },
  //   },
  //   compress: false,
  // },
  output: {
    assetPrefix: "./",
    polyfill: "entry",
  },
});
