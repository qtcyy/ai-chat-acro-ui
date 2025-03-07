import Markdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import gfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneLight,
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import "github-markdown-css/github-markdown-light.css";
import "katex/dist/katex.min.css";
import { MermaidRenderer } from "./MermaidRenderer";
import { useTheme } from "theme";
import styled, { createGlobalStyle } from "styled-components";

type MDRendererProps = {
  text: string;
};

// 定义 code 组件的属性类型
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const MDRenderer = (props: MDRendererProps) => {
  const { isDarkMode, theme } = useTheme();

  return (
    <ContentWrapper className={`markdown-body bg-transparent w-full`}>
      <MarkdownPreStyles />
      <Markdown
        remarkPlugins={[remarkMath, gfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(className || "");
            const language = className?.replace(/language-/, "");
            if (language === "mermaid") {
              return <MermaidRenderer chart={String(children).trim()} />;
            }
            return !inline && match ? (
              <StyledSyntaxHighlighter
                style={isDarkMode ? oneDark : oneLight}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </StyledSyntaxHighlighter>
            ) : (
              <InlineCode className={className} {...props}>
                {children}
              </InlineCode>
            );
          },
        }}
      >
        {props.text}
      </Markdown>
    </ContentWrapper>
  );
};

const InlineCode = styled.code`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.2em 0.4em;
  font-family: monospace;
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  border-radius: 8px !important;
  margin: 1em 0 !important;
  padding: 1em !important;

  /* 你可以添加更多自定义样式，如阴影效果 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05) !important;
`;

const ContentWrapper = styled.div`
  color: ${(props) => props.theme.colors.text};
`;

const MarkdownPreStyles = createGlobalStyle`
  .markdown-body .highlight pre, 
  .markdown-body pre {
    border-radius: 8px;
    background-color:  ${({ theme }) => theme.colors.primary};
    padding: 16px;
    overflow: auto;
    margin-bottom: 16px;
    
    /* 添加阴影效果 */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    
    /* 可以在这里添加更多样式 */
  }
`;
