import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Plus, Send, Mic, Phone, Video } from 'lucide-react-native';
import io from 'socket.io-client';

import { supabase } from './src/lib/supabase';

export default function App() {
  const [connected, setConnected] = useState(true);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // 1. Fetch existing
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    };
    fetchMessages();

    // 2. Real-time
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      chat_id: 'general',
      sender_id: 'mobile_user_1',
      content: inputText,
      type: 'text',
    };

    const { error } = await supabase.from('messages').insert([newMessage]);
    if (error) console.error(error);
    setInputText('');
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>9ja Messenger</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: connected ? '#008751' : '#ff4b4b' }]} />
            <Text style={styles.statusText}>{connected ? 'Online' : 'Connecting...'}</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Search size={24} color="#008751" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Plus size={24} color="#008751" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat List */}
      <ScrollView style={styles.chatList} contentContainerStyle={styles.chatListContent}>
        {messages.map((msg) => (
          <View 
            key={msg.id} 
            style={[
              styles.messageBubble, 
              msg.sender_id === 'mobile_user_1' ? styles.ownMessage : styles.theirMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              msg.sender_id === 'mobile_user_1' ? styles.ownMessageText : styles.theirMessageText
            ]}>
              {msg.content}
            </Text>
            <Text style={styles.messageTime}>
              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TouchableOpacity style={styles.attachButton}>
          <Plus size={24} color="#666" />
        </TouchableOpacity>
        <TextInput 
          style={styles.input} 
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          {inputText.trim() ? <Send size={24} color="#008751" /> : <Mic size={24} color="#666" />}
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ChatItem({ name, message, time, unread }: any) {
  return (
    <TouchableOpacity style={styles.chatItem}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name.charAt(0)}</Text>
      </View>
      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{name}</Text>
          <Text style={styles.chatTime}>{time}</Text>
        </View>
        <Text style={styles.chatMessage} numberOfLines={1}>{message}</Text>
      </View>
      {unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function TabItem({ label, active }: any) {
  return (
    <TouchableOpacity style={styles.tabItem}>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
      {active && <View style={styles.tabIndicator} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fcf9',
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#008751',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  iconButton: {
    padding: 5,
  },
  chatList: {
    flex: 1,
  },
  chatListContent: {
    padding: 15,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: '80%',
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  ownMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#008751',
    borderBottomRightRadius: 2,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
  },
  ownMessageText: {
    color: '#fff',
  },
  theirMessageText: {
    color: '#333',
  },
  messageTime: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.4)',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  attachButton: {
    padding: 5,
  },
  sendButton: {
    padding: 5,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#008751',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatContent: {
    flex: 1,
    marginLeft: 15,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  chatMessage: {
    fontSize: 14,
    color: '#666',
  },
  unreadBadge: {
    backgroundColor: '#008751',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: '#999',
  },
  tabLabelActive: {
    color: '#008751',
    fontWeight: 'bold',
  },
  tabIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#008751',
    marginTop: 4,
  }
});
