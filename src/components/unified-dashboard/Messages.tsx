import { useState } from "react";
import { Search, Send, Paperclip, Phone, Video, ArrowLeft, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

export const Messages = ({ userType }: { userType: "client" | "agent" }) => {
  const [messageText, setMessageText] = useState("");
  const [activeConversation, setActiveConversation] = useState<number | null>(1);
  const [showConversations, setShowConversations] = useState(true);
  const isMobile = useIsMobile();
  
  // Mock conversations data
  const conversations = [
    { 
      id: 1, 
      name: userType === "client" ? "John Smith (Agent)" : "Sarah Johnson (Client)", 
      avatar: userType === "client" ? "https://randomuser.me/api/portraits/men/32.jpg" : "https://randomuser.me/api/portraits/women/32.jpg", 
      lastMessage: "The inspection is complete. Report attached.", 
      time: "2m", 
      unread: 2,
      status: "online",
      projectTitle: "Vehicle Inspection - Honda Civic"
    },
    { 
      id: 2, 
      name: userType === "client" ? "Mike Wilson (Agent)" : "Michael Chen (Client)", 
      avatar: userType === "client" ? "https://randomuser.me/api/portraits/men/45.jpg" : "https://randomuser.me/api/portraits/men/55.jpg", 
      lastMessage: "I'll be there at 2 PM tomorrow", 
      time: "1h", 
      unread: 0,
      status: "offline",
      projectTitle: "Property Assessment"
    },
    { 
      id: 3, 
      name: userType === "client" ? "Emma Davis (Agent)" : "David Rodriguez (Client)", 
      avatar: userType === "client" ? "https://randomuser.me/api/portraits/women/22.jpg" : "https://randomuser.me/api/portraits/men/65.jpg", 
      lastMessage: "Photos uploaded to the report", 
      time: "3h", 
      unread: 1,
      status: "online",
      projectTitle: "Electronics Verification"
    }
  ];

  // Mock messages
  const messages = [
    { id: 1, sender: userType === "client" ? "agent" : "client", text: "Hi! I'm ready to start the inspection.", time: "10:21 AM", isMe: false },
    { id: 2, sender: userType === "client" ? "client" : "agent", text: "Great! The address is correct as listed?", time: "10:22 AM", isMe: true },
    { id: 3, sender: userType === "client" ? "agent" : "client", text: "Yes, I'm here now. Starting the inspection.", time: "10:25 AM", isMe: false },
    { id: 4, sender: userType === "client" ? "client" : "agent", text: "Perfect! Please take detailed photos of any issues you find.", time: "10:26 AM", isMe: true },
    { id: 5, sender: userType === "client" ? "agent" : "client", text: "The inspection is complete. Report attached.", time: "12:15 PM", isMe: false }
  ];
  
  const sendMessage = () => {
    if (messageText.trim()) {
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const handleConversationSelect = (id: number) => {
    setActiveConversation(id);
    if (isMobile) {
      setShowConversations(false);
    }
  };

  const handleBackToList = () => {
    if (isMobile) {
      setShowConversations(true);
    }
  };

  const activeChat = conversations.find(c => c.id === activeConversation);
  
  return (
    <div className="container mx-auto p-2 md:p-6 h-[calc(100vh-200px)]">
      <Card className="h-full flex overflow-hidden bg-white/80 backdrop-blur-sm border-[rgba(42,100,186,0.1)] shadow-xl">
        {/* Conversation List */}
        {(showConversations || !isMobile) && (
          <div className={`${isMobile ? 'w-full' : 'w-1/3 border-r border-[rgba(42,100,186,0.1)]'} flex flex-col h-full`}>
            <div className="p-4 border-b border-[rgba(42,100,186,0.1)] bg-gradient-to-r from-[rgba(42,100,186,0.05)] to-[rgba(13,38,75,0.05)]">
              <h2 className="text-xl font-bold text-[rgba(13,38,75,1)] mb-4">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(13,38,75,0.5)] h-4 w-4" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-10 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/80"
                />
              </div>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer rounded-xl transition-all duration-300 ${
                      activeConversation === conversation.id 
                        ? 'bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] shadow-md' 
                        : 'hover:bg-[rgba(42,100,186,0.05)]'
                    }`}
                    onClick={() => handleConversationSelect(conversation.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white">
                            {conversation.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.status === "online" && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-semibold text-[rgba(13,38,75,1)] truncate">{conversation.name}</h3>
                          <span className="text-xs text-[rgba(13,38,75,0.6)] whitespace-nowrap ml-2">{conversation.time}</span>
                        </div>
                        <p className="text-xs text-[rgba(42,100,186,1)] font-medium mb-1">{conversation.projectTitle}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-[rgba(13,38,75,0.7)] truncate">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <Badge className="bg-red-500 text-white h-5 min-w-5 flex items-center justify-center rounded-full text-xs">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
        
        {/* Chat Area */}
        {(!showConversations || !isMobile) && activeChat && (
          <div className={`${isMobile ? 'w-full' : 'flex-1'} flex flex-col h-full`}>
            {/* Chat Header */}
            <div className="p-4 border-b border-[rgba(42,100,186,0.1)] bg-gradient-to-r from-[rgba(42,100,186,0.05)] to-[rgba(13,38,75,0.05)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isMobile && (
                    <Button variant="ghost" size="sm" onClick={handleBackToList}>
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                    <AvatarImage src={activeChat.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white">
                      {activeChat.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold text-[rgba(13,38,75,1)]">{activeChat.name}</h3>
                    <p className="text-xs text-[rgba(42,100,186,1)] font-medium">{activeChat.projectTitle}</p>
                    <p className="text-xs text-[rgba(13,38,75,0.6)]">
                      {activeChat.status === "online" ? (
                        <span className="text-green-500">● Online</span>
                      ) : (
                        'Offline'
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="hover:bg-[rgba(42,100,186,0.1)]">
                    <Phone className="h-5 w-5 text-[rgba(13,38,75,0.7)]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-[rgba(42,100,186,0.1)]">
                    <Video className="h-5 w-5 text-[rgba(13,38,75,0.7)]" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:bg-[rgba(42,100,186,0.1)]">
                    <MoreVertical className="h-5 w-5 text-[rgba(13,38,75,0.7)]" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isMe && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                        <AvatarImage src={activeChat.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white">
                          {activeChat.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className="max-w-[70%]">
                      <div 
                        className={`rounded-2xl px-4 py-3 ${
                          message.isMe 
                            ? 'bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white rounded-br-sm' 
                            : 'bg-white border border-[rgba(42,100,186,0.1)] text-[rgba(13,38,75,1)] rounded-bl-sm shadow-sm'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                      <div 
                        className={`text-xs text-[rgba(13,38,75,0.6)] mt-1 ${
                          message.isMe ? 'text-right' : 'text-left'
                        }`}
                      >
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="p-4 border-t border-[rgba(42,100,186,0.1)] bg-gradient-to-r from-[rgba(42,100,186,0.02)] to-[rgba(13,38,75,0.02)]">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="hover:bg-[rgba(42,100,186,0.1)]">
                  <Paperclip className="h-5 w-5 text-[rgba(13,38,75,0.7)]" />
                </Button>
                
                <Input 
                  placeholder="Type your message..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="flex-1 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/80"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                />
                
                <Button 
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                  className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] text-white rounded-xl"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};