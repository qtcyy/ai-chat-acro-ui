import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    proxy: {
      "/api": {
        target: "https://ark.cn-beijing.volces.com",
        changeOrigin: true,
        pathRewrite: { "^/api": "/api/v3/chat/completions" },
        // 添加以下配置以支持流式传输
        secure: false,
        ws: true, // 支持 websocket
        headers: {
          Connection: "keep-alive",
          "Cache-Control": "no-cache",
          "Accept-Encoding": "gzip, deflate, br",
        },
      },
    },
    compress: false,
  },
});
