import React from 'react'
import { Message } from '../types'

interface MessageNotificationProps {
  message: Message
  onClose: () => void
}

const MessageNotification: React.FC<MessageNotificationProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto">
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{message.title}</p>
            <p className="mt-1 text-sm text-gray-500">{message.content}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={onClose}
            >
              <span className="sr-only">关闭</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageNotification;