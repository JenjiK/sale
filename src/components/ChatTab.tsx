import React, { useState } from 'react';
import { Send, Phone, Video, MoreVertical, Search } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  time: string;
  isMe: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const chatContacts: ChatContact[] = [
  {
    id: '1',
    name: 'ลูกค้าสมหญิง',
    avatar: '👩‍🌾',
    lastMessage: 'มะเขือเทศยังมีไหมคะ',
    time: '10:30',
    unread: 2,
    online: true
  },
  {
    id: '2',
    name: 'ร้านผักสด ABC',
    avatar: '🏪',
    lastMessage: 'ขอสั่งแตงกวา 20 กิโล',
    time: '09:15',
    unread: 0,
    online: false
  },
  {
    id: '3',
    name: 'คุณมานี',
    avatar: '👨‍💼',
    lastMessage: 'ราคาข้าวโพดเท่าไหร่',
    time: 'เมื่อวาน',
    unread: 1,
    online: true
  },
  {
    id: '4',
    name: 'ตลาดสดใหม่',
    avatar: '🏬',
    lastMessage: 'ขอบคุณสำหรับผลผลิตดีๆ',
    time: 'เมื่อวาน',
    unread: 0,
    online: false
  }
];

const sampleMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'ลูกค้าสมหญิง',
    message: 'สวัสดีค่ะ มะเขือเทศยังมีไหมคะ',
    time: '10:25',
    isMe: false
  },
  {
    id: '2',
    sender: 'ฉัน',
    message: 'สวัสดีครับ มีครับ เพิ่งเก็บเมื่อเช้า สดมากเลย',
    time: '10:26',
    isMe: true
  },
  {
    id: '3',
    sender: 'ลูกค้าสมหญิง',
    message: 'ราคาเท่าไหร่คะ ขอ 5 กิโลได้ไหม',
    time: '10:28',
    isMe: false
  },
  {
    id: '4',
    sender: 'ฉัน',
    message: 'กิโลละ 45 บาทครับ 5 กิโลรวม 225 บาท ส่งฟรีเลยครับ',
    time: '10:29',
    isMe: true
  },
  {
    id: '5',
    sender: 'ลูกค้าสมหญิง',
    message: 'โอเคค่ะ สั่งเลย ส่งที่เดิมนะคะ',
    time: '10:30',
    isMe: false
  }
];

export default function ChatTab() {
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [messages, setMessages] = useState<ChatMessage[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState('');

  const selectedContact = chatContacts.find(c => c.id === selectedChat);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      sender: 'ฉัน',
      message: newMessage,
      time: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Chat List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#4CAF50] mb-4">แชท</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="ค้นหาการสนทนา..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chatContacts.map(contact => (
            <div
              key={contact.id}
              onClick={() => setSelectedChat(contact.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                selectedChat === contact.id ? 'bg-green-50 border-l-4 border-l-[#4CAF50]' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                    {contact.avatar}
                  </div>
                  {contact.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                    {contact.unread > 0 && (
                      <span className="bg-[#4CAF50] text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                      {selectedContact.avatar}
                    </div>
                    {selectedContact.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedContact.name}</h3>
                    <p className="text-sm text-gray-500">
                      {selectedContact.online ? 'ออนไลน์' : 'ออฟไลน์'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-600 hover:text-[#4CAF50] hover:bg-gray-100 rounded-full">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-[#4CAF50] hover:bg-gray-100 rounded-full">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-[#4CAF50] hover:bg-gray-100 rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.isMe
                        ? 'bg-[#4CAF50] text-white'
                        : 'bg-white text-gray-800 shadow-sm'
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p className={`text-xs mt-1 ${
                      message.isMe ? 'text-green-100' : 'text-gray-500'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="พิมพ์ข้อความ..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-[#4CAF50] text-white p-3 rounded-xl hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">เลือกการสนทนา</h3>
              <p className="text-gray-600">เลือกการสนทนาจากรายการด้านซ้าย</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}