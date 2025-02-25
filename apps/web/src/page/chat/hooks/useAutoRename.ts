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

const ARK_API_KEY = "sk-2f7f96daa57447c29397e024650634a9";

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
    const response = await axios({
      method: "POST",
      url: "http://120.26.42.17:8080/proxy/chat/completions",
      headers: {
        ...props.headers,
        "Content-Type": "application/json",
        // Accept: "application/json",
        Authorization: `Bearer ${ARK_API_KEY}`,
      },
      data: JSON.stringify({
        ...props.body,
        messages,
        stream: false,
      }),
    });
    // const data = JSON.parse(response.data);
    const data = response.data;
    const content = data.choices[0]?.message?.content || "";
    if (content) {
      return content;
    }
    return Promise.reject("type error");
  };

  return { getName };
};
