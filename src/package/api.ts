import { Message } from './types';
import { getMessages, addMessage, markMessageAsRead as markRead, deleteMessage as deleteMsgFromDb } from '../backend/messageService';
import { initDatabase } from '../backend/database';

export const fetchMessages = async (): Promise<Message[]> => {
  await initDatabase();
  return getMessages();
};

export const markMessageAsRead = async (messageId: number): Promise<void> => {
  await initDatabase();
  return markRead(messageId);
};

export const addNewMessage = async (title: string, content: string): Promise<Message> => {
  await initDatabase();
  return addMessage(title, content);
};

export const deleteMessage = async (messageId: number): Promise<void> => {
  await initDatabase();
  return deleteMsgFromDb(messageId);
};

export const subscribeToMessages = (callback: (messages: Message[]) => void) => {
  const updateMessages = async () => {
    const messages = await fetchMessages();
    callback(messages);
  };

  // 初始加载
  updateMessages();

  // 模拟实时更新（每5秒检查一次）
  const intervalId = setInterval(updateMessages, 5000);

  // 返回一个取消订阅的函数
  return () => clearInterval(intervalId);
};