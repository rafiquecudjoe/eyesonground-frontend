
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react";

// Mock conversations
const conversations = [
  {
    id: 1,
    name: "John Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "When will you arrive?",
    time: "10:30 AM",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    lastMessage: "Thanks for your help today",
    time: "Yesterday",
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: "Robert Williams",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    lastMessage: "I need to reschedule our appointment",
    time: "Yesterday",
    unread: 0,
    online: true
  },
  {
    id: 4,
    name: "Emily Davis",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    lastMessage: "What time are you available tomorrow?",
    time: "Monday",
    unread: 0,
    online: false
  },
  {
    id: 5,
    name: "Michael Brown",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    lastMessage: "I'll be waiting at the front entrance",
    time: "Sunday",
    unread: 0,
    online: false
  }
];

// Mock messages for the selected conversation
const mockMessages = [
  {
    id: 1,
    senderId: 1, // John Smith
    text: "Hello, I need assistance with my security detail for the upcoming event.",
    time: "10:12 AM",
    isMe: false
  },
  {
    id: 2,
    senderId: "me",
    text: "Hi John, I'd be happy to help. What are the details of the event?",
    time: "10:15 AM",
    isMe: true
  },
  {
    id: 3,
    senderId: 1,
    text: "It's a corporate gathering next Friday at the Marriott downtown. We're expecting around 100 guests including some VIPs.",
    time: "10:18 AM",
    isMe: false
  },
  {
    id: 4,
    senderId: "me",
    text: "Understood. How many security personnel do you think you'll need?",
    time: "10:20 AM",
    isMe: true
  },
  {
    id: 5,
    senderId: 1,
    text: "I was thinking 3-4, plus one dedicated person for the CEO.",
    time: "10:22 AM",
    isMe: false
  },
  {
    id: 6,
    senderId: 1,
    text: "Also, what's your availability next Monday for a site visit?",
    time: "10:22 AM",
    isMe: false
  },
  {
    id: 7,
    senderId: "me",
    text: "That sounds appropriate. I'm available Monday afternoon for the site visit, anytime after 2pm.",
    time: "10:25 AM",
    isMe: true
  },
  {
    id: 8,
    senderId: 1,
    text: "Perfect. Let's plan for 3pm. When will you arrive?",
    time: "10:30 AM",
    isMe: false
  }
];

export const Messages = () => {
  const isMobile = useIsMobile();
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const [showConversations, setShowConversations] = useState(!isMobile);
  
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      // In a real app, you would add the message to the conversation
      setMessage("");
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const selectConversation = (conversation: typeof conversations[0]) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setShowConversations(false);
    }
  };
  
  return (
    <div className="container mx-auto p-2 md:p-6 h-[calc(100vh-200px)]">
      <div className="flex h-full rounded-lg overflow-hidden border border-gray-200 bg-white">
        {/* Conversation list - hidden on mobile when chat is shown */}
        {(showConversations || !isMobile) && (
          <div className={`${isMobile ? 'w-full' : 'w-1/3 border-r'} flex flex-col h-full bg-gray-50`}>
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id}
                  className={`p-4 flex items-center gap-3 hover:bg-gray-100 cursor-pointer border-b ${
                    selectedConversation.id === conversation.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => selectConversation(conversation)}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  
                  {conversation.unread > 0 && (
                    <Badge className="bg-blue-500 h-5 w-5 flex items-center justify-center rounded-full p-0">
                      {conversation.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
        
        {/* Chat area - shown or hidden based on mobile state */}
        {(!showConversations || !isMobile) && selectedConversation && (
          <div className={`${isMobile ? 'w-full' : 'w-2/3'} flex flex-col h-full`}>
            {/* Chat header */}
            <div className="p-4 border-b flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mr-1" 
                    onClick={() => setShowConversations(true)}
                  >
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </Button>
                )}
                
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-medium">{selectedConversation.name}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.online ? (
                      <span className="text-green-500">Online</span>
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5 text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5 text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!msg.isMe && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                        <AvatarImage src={selectedConversation.avatar} />
                        <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className="max-w-[70%]">
                      <div 
                        className={`rounded-lg px-4 py-2 inline-block ${
                          msg.isMe 
                            ? 'bg-blue-500 text-white rounded-br-none' 
                            : 'bg-gray-200 text-gray-800 rounded-bl-none'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <div 
                        className={`text-xs text-gray-500 mt-1 ${
                          msg.isMe ? 'text-right' : 'text-left'
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Message input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5 text-gray-600" />
                </Button>
                
                <Input 
                  placeholder="Type a message..." 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                />
                
                <Button 
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
