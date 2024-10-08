import React, { useEffect, useState, useCallback } from 'react'
import { Plus, RefreshCw, Settings } from 'lucide-react'
import MessageList from './MessageList'
import MessageNotification from './MessageNotification'
import { 
  Message, 
  fetchMessages, 
  markMessageAsRead, 
  addNewMessage, 
  deleteMessage,
  subscribeToMessages,
  checkNotificationPermission,
  requestNotificationPermission,
  showNotification,
  openNotificationSettings,
  NotificationStatus
} from '../index'

const MessageCenter: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [notificationStatus, setNotificationStatus] = useState<NotificationStatus>('default');
  const [showNotificationMessage, setShowNotificationMessage] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToMessages(setMessages);
    checkNotificationPermission().then(setNotificationStatus);
    return () => unsubscribe();
  }, []);

  const handleMarkAsRead = useCallback(async (messageId: number) => {
    await markMessageAsRead(messageId);
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
  }, []);

  const handleDeleteMessage = useCallback(async (messageId: number) => {
    await deleteMessage(messageId);
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
  }, []);

  const handleAddMessage = useCallback(async () => {
    const newMessage = await addNewMessage("新消息", "这是一条新消息的内容");
    setMessages(prevMessages => [newMessage, ...prevMessages]);
    showNotification("新消息", "您有一条新消息");
  }, []);

  const handleRefresh = useCallback(async () => {
    const updatedMessages = await fetchMessages();
    setMessages(updatedMessages);
  }, []);

  const handleRequestPermission = useCallback(async () => {
    const status = await requestNotificationPermission();
    setNotificationStatus(status);
    setShowNotificationMessage(true);
    setTimeout(() => setShowNotificationMessage(false), 3000);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">消息中心</h1>
        <div className="flex space-x-2">
          <button onClick={handleAddMessage} className="p-2 bg-blue-500 text-white rounded">
            <Plus size={20} />
          </button>
          <button onClick={handleRefresh} className="p-2 bg-green-500 text-white rounded">
            <RefreshCw size={20} />
          </button>
          <button onClick={handleRequestPermission} className="p-2 bg-yellow-500 text-white rounded">
            <Settings size={20} />
          </button>
        </div>
      </div>
      {showNotificationMessage && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">
          通知权限状态: {notificationStatus}
        </div>
      )}
      <MessageList 
        messages={messages} 
        onMarkAsRead={handleMarkAsRead} 
        onDeleteMessage={handleDeleteMessage} 
      />
    </div>
  );
}

export default MessageCenter;