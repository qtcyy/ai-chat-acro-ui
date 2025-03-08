import { BubbleDataType } from "components";
import axios from "axios";
import { MessageType } from "./useChatStorage";

type Props = {
  messages: BubbleDataType<MessageType>[];
  headers?: any;
  body?: any;
};

type RequestMessageType = {
  role: string;
  content: string;
};

const SELF_API = "http://120.26.42.17:8080/proxy/chat/completions";
const ARK_API_KEY = "sk-2f7f96daa57447c29397e024650634a9";
const ALIBABA_API =
  "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

export const useAutoRename = (props: Props) => {
  const temp = props.messages;
  let messages: RequestMessageType[] = temp.map((chat) => {
    const content = chat.content;
    return {
      role: chat.role,
      content: content?.answer ?? " ",
    };
  });
  messages.push({
    role: "user",
    content:
      "现在我要为这则对话命名，以上的所有对话均为这则对话的信息。请帮我编写一个对话的标题。注意，在返回中只包含你编写的标题字符串，谢谢。",
  });
  messages = messages.filter((o) => o.role !== "start");

  const getName = async () => {
    console.log(messages);
    const response = await fetch(ALIBABA_API, {
      method: "POST",
      headers: {
        ...props.headers,
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${ARK_API_KEY}`,
      },
      body: JSON.stringify({
        ...props.body,
        messages,
        stream: true,
      }),
    });

    if (!response.body) {
      return Promise.reject("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let content = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter(Boolean);

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const jsonStr = line.replace("data: ", "").trim();
          if (jsonStr === "[DONE]") {
            break;
          }
          try {
            const parsed = JSON.parse(jsonStr);
            const deltaContent = parsed.choices[0]?.delta?.content;
            if (deltaContent) {
              content += deltaContent;
            }
          } catch (error) {
            console.error("Parsing error:", error);
          }
        }
      }
    }

    if (content) {
      return content;
    }

    return Promise.reject("type error");
  };

  return { getName };
};
