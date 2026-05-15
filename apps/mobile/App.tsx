import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { supabase } from './src/lib/supabase';

export default function App() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState('');
  const [activeCall, setActiveCall] = useState<any>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
    };
    fetchMessages();

    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    const callChannel = supabase
      .channel('public:calls')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'calls' }, (payload) => {
        if (payload.new.receiver_id === 'mobile_user_1' && payload.new.status === 'ringing') {
          setActiveCall(payload.new);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(callChannel);
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    await supabase.from('messages').insert([{
      chat_id: 'general',
      sender_id: 'mobile_user_1',
      content: inputText,
      type: 'text',
    }]);
    setInputText('');
  };

  const handleCall = async (type: 'audio' | 'video') => {
    await supabase.from('calls').insert([{
      caller_id: 'mobile_user_1',
      receiver_id: 'target_user',
      type,
      status: 'ringing',
    }]);
  };

  const handleEndCall = async () => {
    if (activeCall) {
      await supabase.from('calls').update({ status: 'ended' }).eq('id', activeCall.id);
      setActiveCall(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>9ja Messenger 🇳🇬</Text>
        <View style={styles.callButtons}>
          <TouchableOpacity style={styles.callBtn} onPress={() => handleCall('audio')}>
            <Text style={styles.callBtnText}>📞</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callBtn} onPress={() => handleCall('video')}>
            <Text style={styles.callBtnText}>📹</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messageList} contentContainerStyle={styles.messageContent}>
        {messages.length === 0 && (
          <Text style={styles.emptyText}>No messages yet. Say hello! 👋</Text>
        )}
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.bubble,
              msg.sender_id === 'mobile_user_1' ? styles.ownBubble : styles.theirBubble,
            ]}
          >
            <Text style={msg.sender_id === 'mobile_user_1' ? styles.ownText : styles.theirText}>
              {msg.content}
            </Text>
            <Text style={styles.timeText}>
              {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
          <Text style={styles.sendBtnText}>Send</Text>
        </TouchableOpacity>
      </View>

      {/* Incoming Call Overlay */}
      {activeCall && (
        <View style={styles.callOverlay}>
          <Text style={styles.callTitle}>
            {activeCall.type === 'video' ? '📹' : '📞'} Incoming {activeCall.type} call
          </Text>
          <Text style={styles.callFrom}>from {activeCall.caller_id}</Text>
          <View style={styles.callActions}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#008751' }]}
              onPress={() => supabase.from('calls').update({ status: 'answered' }).eq('id', activeCall.id)}
            >
              <Text style={styles.actionBtnText}>✅ Answer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#ff4b4b' }]}
              onPress={handleEndCall}
            >
              <Text style={styles.actionBtnText}>❌ Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f9f4' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#008751',
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  callButtons: { flexDirection: 'row', gap: 12 },
  callBtn: { padding: 4 },
  callBtnText: { fontSize: 22 },
  messageList: { flex: 1 },
  messageContent: { padding: 16, gap: 8 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
  bubble: {
    padding: 12,
    borderRadius: 18,
    maxWidth: '80%',
    marginVertical: 2,
  },
  ownBubble: { alignSelf: 'flex-end', backgroundColor: '#008751', borderBottomRightRadius: 4 },
  theirBubble: { alignSelf: 'flex-start', backgroundColor: '#fff', borderBottomLeftRadius: 4 },
  ownText: { color: '#fff', fontSize: 16 },
  theirText: { color: '#333', fontSize: 16 },
  timeText: { fontSize: 10, color: 'rgba(0,0,0,0.4)', marginTop: 4, alignSelf: 'flex-end' },
  inputRow: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#f5f5f5',
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  sendBtn: {
    backgroundColor: '#008751',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
  },
  sendBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  callOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,50,30,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callTitle: { fontSize: 32, color: '#fff', marginBottom: 8 },
  callFrom: { fontSize: 18, color: 'rgba(255,255,255,0.7)', marginBottom: 48 },
  callActions: { flexDirection: 'row', gap: 24 },
  actionBtn: { paddingHorizontal: 28, paddingVertical: 16, borderRadius: 30 },
  actionBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
