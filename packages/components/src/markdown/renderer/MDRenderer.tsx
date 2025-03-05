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
import styled from "styled-components";

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
              <SyntaxHighlighter
                style={isDarkMode ? oneDark : oneLight}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {props.text}
      </Markdown>
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  color: ${(props) => props.theme.colors.text};
`;
