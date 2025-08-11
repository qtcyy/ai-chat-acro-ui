import { BubbleDataType } from "components";
import { MessageType } from "./useChatStorage";
import { useCallback, useEffect, useRef, useState } from "react";
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

const ALI_API = "https://dashscope.aliyuncs.com/compatible-mode/v1";
const ALI_API_KEY = "sk-490fc6a12924409489eea7ee17b8f714";

const CLOUD_API = "http://120.26.42.17:8080/proxy/chat/completions/stream";

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
  const loadingRef = useRef(false);

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

  const ctrlRef = useRef<AbortController | null>(null);

  useEffect(() => {
    ctrlRef.current = new AbortController();

    return () => {
      if (ctrlRef.current) {
        ctrlRef.current.abort();
      }
    };
  }, []);

  const cancel = useCallback(() => {
    console.log("cancel");
    if (ctrlRef.current) {
      ctrlRef.current.abort();
      ctrlRef.current = new AbortController();
    }
    setLoading(false);
    setCloseSignal((c) => c + 1);
  }, []);

  const ask = useCallback(
    (question: string, aiProps?: string) => {
      console.log(question);
      if (loading || !ctrlRef.current) {
        return;
      }
      setLoading(true);
      console.log(question);
      let sendMessages: SendMessageType[] = [
        { role: ROLE.user, content: aiProps ?? AIProps },
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

<<<<<<< HEAD
    fetchEventSource(CLOUD_API, {
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
=======
      fetchEventSource(
        "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
        {
          method: "POST",
          signal: ctrlRef.current.signal,
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
          keepalive: true,
          onopen(response) {
            if (loadingRef.current) {
              return Promise.resolve();
            }
            loadingRef.current = true;
            console.log("open state: ", loadingRef.current);
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
              oldThink += think;
            } else if (think) {
              oldThink += think;
            }
            if (answer) {
              oldIsThink = false;
              oldAnswer += answer;
            }
            // oldThink += think;
            // oldAnswer += answer;
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
            loadingRef.current = false;
            throw err;
          },
          onclose() {
            setLoading(false);
            loadingRef.current = false;
            setTimeout(() => {
              setCloseSignal((c) => c + 1);
            }, 50);
          },
>>>>>>> ws(themed)
        }
      );
    },
    [setLoading, selectedModel, props.onOpen, props.onClose]
  );

  return { messages, setMessages, ask, cancel, loading };
};

export { useChat };
