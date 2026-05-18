import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { messageAPI } from '../utils/api';
import { getAvatarUrl } from '../utils/constants';
import { Sidebar } from '../components/Sidebar';
import { Loader } from '../components/Loader';
import toast from 'react-hot-toast';
import styles from './Chat.module.css';

export const Chat = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations();
  }, []);

  // Fetch messages when selected chat changes
  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.user._id);
    }
  }, [selectedChat]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const res = await messageAPI.getConversations();
      setConversations(res.data.data || []);
      if (!selectedChat && res.data.data.length > 0) {
        setSelectedChat(res.data.data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      // Show empty state instead of error for new users
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await messageAPI.getMessages(userId);
      setMessages(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      toast.error('Failed to load messages');
      setMessages([]);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !selectedChat) return;

    const messageContent = inputValue;
    setInputValue('');
    setSending(true);

    try {
      const res = await messageAPI.sendMessage({
        receiverId: selectedChat.user._id,
        content: messageContent,
      });
      
      // Add message to local state immediately
      setMessages([...messages, res.data.data]);
      
      // Update conversation list to show this conversation on top
      const updatedConversations = conversations.map(conv => {
        if (conv.user._id === selectedChat.user._id) {
          return {
            ...conv,
            lastMessage: messageContent,
            lastMessageTime: new Date(),
          };
        }
        return conv;
      });
      setConversations(updatedConversations.sort((a, b) => 
        new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
      ));
    } catch (error) {
      console.error('Failed to send message:', error);
      setInputValue(messageContent); // Restore input on error
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.chatPage}>
      <Sidebar active="chat" />

      <main className={styles.content}>
        <div className={styles.chatLayout}>
          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <h2>💬 Messages</h2>
            </div>
            <div className={styles.chatList}>
              {conversations.length > 0 ? (
                conversations.map((conv) => (
                  <motion.div
                    key={conv.user._id}
                    className={`${styles.chatItem} ${selectedChat?.user._id === conv.user._id ? styles.active : ''}`}
                    onClick={() => setSelectedChat(conv)}
                    whileHover={{ x: 4 }}
                  >
                    <img 
                      src={getAvatarUrl(conv.user.profilePicture)} 
                      alt={conv.user.name}
                      className={styles.chatAvatar}
                    />
                    <div className={styles.chatInfo}>
                      <h4>{conv.user.name}</h4>
                      <p>{conv.lastMessage}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>No messages yet</p>
                  <small>Start a conversation with someone</small>
                </div>
              )}
            </div>
          </aside>

          {/* Chat Area */}
          <div className={styles.chatArea}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className={styles.chatHeader}>
                  <img 
                    src={getAvatarUrl(selectedChat.user.profilePicture)} 
                    alt={selectedChat.user.name}
                    className={styles.headerAvatar}
                  />
                  <div>
                    <h2>{selectedChat.user.name}</h2>
                    <p>Active now</p>
                  </div>
                </div>

                {/* Messages */}
                <div className={styles.messagesContainer}>
                  {messages.length > 0 ? (
                    messages.map((msg) => {
                      const isSent = msg.sender._id === user?._id;
                      return (
                        <motion.div
                          key={msg._id}
                          className={`${styles.message} ${isSent ? styles.sent : styles.received}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          {!isSent && (
                            <img 
                              src={getAvatarUrl(msg.sender.profilePicture)}
                              alt={msg.sender.name}
                              className={styles.messageAvatar}
                            />
                          )}
                          <div className={styles.messageBubble}>
                            {msg.content}
                          </div>
                          {isSent && (
                            <img 
                              src={getAvatarUrl(msg.sender.profilePicture)}
                              alt={msg.sender.name}
                              className={styles.messageAvatar}
                            />
                          )}
                          <p className={styles.messageTime}>
                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </motion.div>
                      );
                    })
                  ) : (
                    <div className={styles.emptyMessages}>
                      <p>No messages yet. Start a conversation!</p>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className={styles.inputArea}>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !sending && handleSend()}
                    disabled={sending}
                  />
                  <button 
                    onClick={handleSend} 
                    className={styles.sendBtn}
                    disabled={!inputValue.trim() || sending}
                  >
                    {sending ? '⏳' : '📤'}
                  </button>
                </div>
              </>
            ) : (
              <div className={styles.noChatSelected}>
                <p>Select a conversation to start chatting</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

