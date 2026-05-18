import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import styles from './Chat.module.css';

export const Chat = () => {
  const [messages, setMessages] = React.useState([
    { id: 1, sender: 'Priya', message: 'Hey! Want to collaborate on React?', time: '10:30 AM', avatar: '👩' },
    { id: 2, sender: 'You', message: 'Sure! I want to learn advanced patterns', time: '10:32 AM', avatar: '👨' },
    { id: 3, sender: 'Priya', message: 'Great! Let me share some resources', time: '10:35 AM', avatar: '👩' },
  ]);
  const [inputValue, setInputValue] = React.useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'You', message: inputValue, time: 'Now', avatar: '👨' }]);
      setInputValue('');
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.chatPage}>
        <div className={styles.container}>
          <div className={styles.chatLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
              <h2>Messages</h2>
              <div className={styles.chatList}>
                {[
                  { id: 1, name: 'Priya Sharma', lastMessage: 'Let me share some resources', unread: 2 },
                  { id: 2, name: 'Arjun Patel', lastMessage: 'See you at the study session', unread: 0 },
                  { id: 3, name: 'Neha Gupta', lastMessage: 'Thanks for your help!', unread: 1 },
                ].map((chat) => (
                  <motion.div key={chat.id} className={styles.chatItem} whileHover={{ x: 4 }}>
                    <div className={styles.chatAvatar}>👤</div>
                    <div className={styles.chatInfo}>
                      <h4>{chat.name}</h4>
                      <p>{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && <span className={styles.unread}>{chat.unread}</span>}
                  </motion.div>
                ))}
              </div>
            </aside>

            {/* Chat Area */}
            <div className={styles.chatArea}>
              {/* Chat Header */}
              <div className={styles.chatHeader}>
                <h2>Priya Sharma</h2>
                <p>Active now</p>
              </div>

              {/* Messages */}
              <div className={styles.messagesContainer}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`${styles.message} ${msg.sender === 'You' ? styles.sent : styles.received}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={styles.messageBubble}>{msg.message}</div>
                    <p className={styles.messageTime}>{msg.time}</p>
                  </motion.div>
                ))}
              </div>

              {/* Input Area */}
              <div className={styles.inputArea}>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className={styles.sendBtn}>
                  📤
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
