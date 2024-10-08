import { Message } from './package/types';

// 用于生成唯一ID的函数
const generateId = (): number => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

// 从localStorage获取消息
const getStoredMessages = (): Message[] => {
  const storedMessages = localStorage.getItem('messages');
  return storedMessages ? JSON.parse(storedMessages) : [];
};

// 将消息保存到localStorage
const saveMessages = (messages: Message[]): void => {
  localStorage.setItem('messages', JSON.stringify(messages));
};

// 模拟延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟后端API
export const mockBackendApi = {
  // 获取所有消息
  getMessages: async (): Promise<Message[]> => {
    await delay(500); // 模拟网络延迟
    return getStoredMessages();
  },

  // 添加新消息
  addMessage: async (title: string, content: string): Promise<Message> => {
    await delay(500);
    const newMessage: Message = {
      id: generateId(),
      title,
      content,
      read: false,
    };
    const messages = getStoredMessages();
    messages.push(newMessage);
    saveMessages(messages);
    return newMessage;
  },

  // 将消息标记为已读
  markAsRead: async (messageId: number): Promise<void> => {
    await delay(300);
    const messages = getStoredMessages();
    const updatedMessages = messages.map(msg =>
      msg.id === messageId ? { ...msg, read: true } : msg
    );
    saveMessages(updatedMessages);
  },

  // 删除消息
  deleteMessage: async (messageId: number): Promise<void> => {
    await delay(300);
    const messages = getStoredMessages();
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    saveMessages(updatedMessages);
  },
};