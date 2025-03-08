import { request } from "utils";
import { ChatItem, MessageType } from "./useChatStorage";
import { BaseResponseType } from "../../../env";
import { BubbleDataType } from "components";

type HistoryResponseType = { content: string; id: string } & Omit<
  ChatItem,
  "content"
>;

type ResponseDataType = { data: HistoryResponseType[] } & BaseResponseType;

export async function getHistory() {
  try {
    const response = await request.get<ResponseDataType>("/api/chat/history");
    if (response.data.code === 200) {
      const history: HistoryResponseType[] = response.data.data;
      const data: ChatItem[] = [];
      history.map((item) => {
        const contentStr = item.content;
        data.push({
          ...item,
          content: JSON.parse(contentStr),
          chatId: item.id,
        });
      });
      return data;
    } else {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type WriteHistoryType = {
  content: string;
  id: string;
} & Omit<ChatItem, "content">;

export async function writeHistory(chat: ChatItem) {
  try {
    const data: WriteHistoryType = {
      ...chat,
      content: JSON.stringify(chat.content),
      id: chat.chatId,
    };

    const response = await request.post<BaseResponseType>(
      "/api/chat/history/write",
      data
    );
    if (response.data.code !== 200) {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateHistory(chat: ChatItem) {
  try {
    const data: WriteHistoryType = {
      ...chat,
      content: JSON.stringify(chat.content),
      id: chat.chatId,
    };
    const response = await request.post<BaseResponseType>(
      "/api/chat/history/update",
      data
    );
    if (response.data.code !== 200) {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

type UpdateContentType = {
  id: string;
  content: BubbleDataType<MessageType>[];
};

export async function updateHistoryContent(params: UpdateContentType) {
  // console.log(params.content);
  // console.log(JSON.stringify({ ...params.content }));
  try {
    const response = await request.post<BaseResponseType>(
      "/api/chat/history/update/content",
      { id: params.id, content: JSON.stringify(params.content) }
    );
    if (response.data.code !== 200) {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteHistory(chatId: string) {
  try {
    const response = await request.delete<BaseResponseType>(
      `/api/chat/history/delete/${chatId}`
    );
    if (response.data.code !== 200) {
      throw new Error(response.data.msg);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
