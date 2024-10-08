import React from 'react'
import { Message } from '../types'
import { CheckCircle, Trash } from 'lucide-react'

interface MessageListProps {
  messages: Message[]
  onMarkAsRead: (messageId: number) => void
  onDeleteMessage: (messageId: number) => void
}

const MessageList: React.FC<MessageListProps> = ({ messages, onMarkAsRead, onDeleteMessage }) => {
  return (
    <div className="space-y-4">
      {messages.map(message => (
        <div key={message.id} className={`p-4 border rounded ${message.read ? 'bg-gray-100' : 'bg-white'}`}>
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-semibold">{message.title}</h2>
            <div className="flex space-x-2">
              {!message.read && (
                <button onClick={() => onMarkAsRead(message.id)} className="text-blue-500">
                  <CheckCircle size={20} />
                </button>
              )}
              <button onClick={() => onDeleteMessage(message.id)} className="text-red-500">
                <Trash size={20} />
              </button>
            </div>
          </div>
          <p className="mt-2">{message.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;