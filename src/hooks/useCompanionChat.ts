import { useState, useCallback } from 'react';
import { useSocket } from '../contexts/SocketContext';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'companion';
  timestamp: Date;
};

export function useCompanionChat() {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (text: string) => {
    if (!socket) return;

    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setIsTyping(true);

    socket.emit('companion:message', { text });

    socket.once('companion:response', (response) => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: response.message,
        sender: 'companion',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    });
  }, [socket]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat
  };
}