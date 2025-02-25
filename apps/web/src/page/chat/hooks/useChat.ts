import { BubbleDataType } from "components";
import { MessageType } from "./useChatStorage";
import { useEffect, useState } from "react";
import { ROLE } from "../layout/Chat";
import dayjs from "dayjs";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useStore } from "../../../store";

type Props = {
  initialMessages?: BubbleDataType<MessageType>[];
  onOpen?: () => void;
  onMessage?: () => void;
  onClose?: () => void;
};

type SendMessageType = {
  role: string;
  content: string;
};

const AIProps = "你是一个有帮助的智能助理，请帮助我解决问题";
const ARK_API_KEY = "sk-2f7f96daa57447c29397e024650634a9";
const ARK_API_PRI = "https://ark.cn-beijing.volces.com/";
const LOBE_API_KEY = "sk-RULGrxWdcfMwLVCgq0l0BEJ52zJsdoPxFOlD45WYWZda9McU";

const ARK_API =
  "https://ark.cn-beijing.volces.com/api/v3/chat/completions/stream";
const LOBE_API = "https://chat.cloudapi.vip/v1/chat/completions";

const regex1 = /\\((.+?)\\)/g;
const regex2 = /\\\[(.+?)\\\]/g;

const useChat = (props: Props) => {
  const [messages, setMessages] = useState<BubbleDataType<MessageType>[]>(
    props.initialMessages ?? []
  );
  const [loading, setLoading] = useState(false);
  const [closeSignal, setCloseSignal] = useState(0);
  const { selectedModel } = useStore();

  useEffect(() => {
    if (closeSignal === 0 || loading) {
      return;
    }
    setMessages((old) => {
      // let last = old[old.length - 1].content as MessageType;
      // last.isEnd = true;
      // old[old.length - 1].content = last;
      old = old.map((item) => {
        if (item.role === ROLE.assistant && item.content?.isEnd) {
          item.content.isEnd = true;
        }
        return item;
      });
      return [...old];
    });
    console.log(messages);
    props.onClose?.();
  }, [closeSignal, loading]);

  const cancel = () => {};

  const ask = (question: string) => {
    if (loading) {
      return;
    }
    setLoading(true);
    console.log(question);
    let sendMessages: SendMessageType[] = [
      { role: ROLE.user, content: AIProps },
    ];
    sendMessages.push(
      ...messages.map((message) => {
        return { role: message.role, content: message.content?.answer ?? "" };
      })
    );
    sendMessages = sendMessages.filter((o) => o.role !== ROLE.start);
    sendMessages.push({ role: ROLE.user, content: question });

    setMessages((old) => {
      old.push({
        role: ROLE.user,
        content: {
          id: String(old.length),
          answer: question,
          query: question,
          isEnd: true,
          createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
        key: String(old.length),
      });
      return [...old];
    });
    console.log(sendMessages);

    let oldIsThink = false;
    let oldThink = "";
    let oldAnswer = "";

    fetchEventSource("https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ARK_API_KEY}`,
        Accept: "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: sendMessages,
        stream: true,
      }),
      onopen(response) {
        console.log(response);
        setMessages((old) => {
          old.push({
            role: ROLE.assistant,
            key: String(old.length),
            content: {
              id: String(old.length),
              answer: "",
              query: question,
              isEnd: false,
            },
          });
          return [...old];
        });
        if (props.onOpen) {
          props.onOpen();
        }
        return Promise.resolve();
      },
      onmessage(event) {
        if (event.data === "[DONE]") {
          return;
        }

        const data = JSON.parse(event.data);
        const think = data.choices[0]?.delta?.reasoning_content;
        const answer = data.choices[0]?.delta?.content;

        if (!oldIsThink && think) {
          oldIsThink = true;
        }
        if (answer) {
          oldIsThink = false;
        }
        oldThink += think;
        oldAnswer += answer;
        oldThink = oldThink.replace(/\\\((.*?)\\\)/g, "$$$1$$");
        oldThink = oldThink.replace(/\\\[(.*?)\\\]/g, "$$$$$1$$$$");
        oldThink = oldThink.replaceAll("\\[", "$$");
        oldThink = oldThink.replaceAll("\\]", "$$");

        oldAnswer = oldAnswer.replace(/\\\((.*?)\\\)/g, "$$$1$$");
        oldAnswer = oldAnswer.replace(/\\\[(.*?)\\\]/g, "$$$$$1$$$$");
        oldAnswer = oldAnswer.replaceAll("\\[", "$$");
        oldAnswer = oldAnswer.replaceAll("\\]", "$$");

        setMessages((old) => {
          let last = old[old.length - 1].content as MessageType;
          last = {
            ...last,
            answer: oldAnswer,
            think: oldThink,
            isThink: oldIsThink,
          };
          old[old.length - 1].content = last;
          return [...old];
        });
      },
      onerror(err) {
        console.error(err);
        setLoading(false);
      },
      onclose() {
        setLoading(false);
        setTimeout(() => {
          setCloseSignal((c) => c + 1);
        }, 50);
      },
    });
  };

  return { messages, setMessages, ask, cancel, loading };
};

export { useChat };
