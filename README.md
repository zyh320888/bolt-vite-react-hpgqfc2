# react-message-notifier

一个用于显示消息和通知的 React 组件库。

## 安装

```bash
npm install react-message-notifier
```

## 使用

```jsx
import React, { useState, useEffect } from 'react';
import { MessageList, subscribeToMessages, markMessageAsRead } from 'react-message-notifier';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    subscribeToMessages(setMessages);
  }, []);

  const handleMarkAsRead = async (messageId) => {
    await markMessageAsRead(messageId);
  };

  return (
    <div>
      <h1>消息列表</h1>
      <MessageList messages={messages} onMarkAsRead={handleMarkAsRead} />
    </div>
  );
}

export default App;
```

## API

### 组件

- `MessageList`: 显示消息列表的组件
- `MessageNotification`: 显示单条消息通知的组件

### 函数

- `fetchMessages()`: 获取所有消息
- `markMessageAsRead(messageId)`: 将消息标记为已读
- `addNewMessage(title, content)`: 添加新消息
- `subscribeToMessages(callback)`: 订阅消息更新

## 许可证

MIT