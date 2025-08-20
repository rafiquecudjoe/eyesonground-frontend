
import { useState } from "react";
import { Search, Send, Mic, Video, Phone, ArrowLeft, Plus, Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

export const Messages = () => {
  const [messageText, setMessageText] = useState("");
  const [activeConversation, setActiveConversation] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState("chats");
  const isMobile = useIsMobile();
  
  // Mock data for conversations
  const conversations = [
    { 
      id: 1, 
      name: "Leader-nim", 
      avatar: "", 
      lastMessage: "Time is running!", 
      time: "1m", 
      unread: 4,
      status: "online", 
      typing: false,
      role: "PSI Manager" 
    },
    { 
      id: 2, 
      name: "Se Hun Oh", 
      avatar: "", 
      lastMessage: "Just stop, I'm already late!!", 
      time: "3m", 
      unread: 0,
      status: "offline",
      typing: false,
      icon: "mic",
      role: "PSI Agent" 
    },
    { 
      id: 3, 
      name: "Jong Dae Hyung", 
      avatar: "", 
      lastMessage: "Typing...", 
      time: "12m", 
      unread: 0,
      status: "offline",
      typing: true,
      role: "PSI Agent" 
    },
    { 
      id: 4, 
      name: "Yixing Gege", 
      avatar: "", 
      lastMessage: "🎤 Voice Message", 
      time: "2h", 
      unread: 0,
      status: "offline",
      typing: false,
      icon: "mic",
      role: "PSI Agent" 
    },
    { 
      id: 5, 
      name: "Yeollie Hyung", 
      avatar: "", 
      lastMessage: "I'll send the rest later", 
      time: "3h", 
      unread: 1,
      status: "offline",
      typing: false,
      role: "PSI Agent" 
    },
    { 
      id: 6, 
      name: "Baek Hyunnie", 
      avatar: "", 
      lastMessage: "📷 Photo", 
      time: "Mon", 
      unread: 3,
      status: "offline",
      typing: false,
      role: "PSI Agent" 
    },
    { 
      id: 7, 
      name: "Min Seok Hyung", 
      avatar: "", 
      lastMessage: "ok hyung, already on my bag!", 
      time: "1 week", 
      unread: 0,
      status: "offline",
      typing: false,
      role: "PSI Agent" 
    },
    { 
      id: 8, 
      name: "Tae Min", 
      avatar: "", 
      lastMessage: "seems to be waiting for a reply to your message since 1 month ago 😊", 
      time: "", 
      unread: 0,
      status: "offline",
      typing: false,
      pinned: true,
      role: "PSI Agent" 
    },
  ];
  
  // Mock data for messages in the active conversation
  const messages = [
    { id: 1, sender: "agent", text: "Where's your report?", time: "10:21" },
    { id: 2, sender: "user", text: "I've already sent it to Sehun 🙈", time: "10:21" },
    { id: 3, sender: "user", type: "audio", duration: "0:08", time: "13:56" },
    { id: 4, sender: "agent", text: "Jongin-ah, please 😊", time: "14:05" },
    { id: 5, sender: "agent", text: "You can't be late this time, bro", time: "14:07" },
    { id: 6, sender: "agent", text: "We're all just waiting for you", time: "14:08" },
    { id: 7, sender: "agent", text: "Time is running!", time: "14:10" },
  ];
  
  const sendMessage = () => {
    if (messageText.trim()) {
      // In a real app, you would send this to an API
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  const handleConversationSelect = (id: number) => {
    setActiveConversation(id);
    if (isMobile) {
      // On mobile, switch to conversation view when a conversation is selected
      setActiveTab("conversation");
    }
  };

  const handleBackToList = () => {
    if (isMobile) {
      setActiveTab("chats");
    }
  };
  
  const renderConversationList = () => (
    <div className="h-full flex flex-col">
      <div className="p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[rgba(13,38,75,1)]">Chats</h2>
        {isMobile && (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Phone className="h-5 w-5 text-[rgba(13,38,75,1)]" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search messages" 
            className="pl-9 bg-gray-100 border-0 rounded-full" 
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1">
          {/* Pinned message */}
          {conversations.find(c => c.pinned) && (
            <div className="p-4 bg-gray-50 rounded-lg mx-4 mb-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[rgba(13,38,75,1)] text-white">
                    {conversations.find(c => c.pinned)?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">{conversations.find(c => c.pinned)?.name}</span> {' '}
                    {conversations.find(c => c.pinned)?.lastMessage}
                  </p>
                  <Button variant="ghost" size="sm" className="h-7 mt-1 text-[rgba(42,100,186,1)] px-3 py-1">
                    Reply Now
                  </Button>
                </div>
              </div>
            </div>
          )}

          {conversations.filter(c => !c.pinned).map((conversation) => (
            <div 
              key={conversation.id}
              className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${activeConversation === conversation.id ? 'bg-gray-50' : ''}`}
              onClick={() => handleConversationSelect(conversation.id)}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[rgba(13,38,75,1)] text-white">
                      {conversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.status === "online" && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 truncate">{conversation.name}</h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{conversation.time}</span>
                  </div>
                  <div className="flex items-center">
                    {conversation.typing ? (
                      <p className="text-sm text-[rgba(42,100,186,1)] italic truncate">Typing...</p>
                    ) : (
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.icon === "mic" && <Check className="inline h-3 w-3 mr-1 text-gray-400" />} 
                        {conversation.lastMessage}
                      </p>
                    )}
                    {conversation.unread > 0 && (
                      <Badge 
                        variant="default" 
                        className="ml-2 bg-red-500 text-white h-5 min-w-5 flex items-center justify-center rounded-full px-1.5"
                      >
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
      
      <div className="p-4 flex justify-center">
        <Button className="rounded-full bg-[rgba(42,100,186,1)] h-14 w-14 shadow-lg">
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );

  const renderConversationView = () => {
    const activeChat = conversations.find(c => c.id === activeConversation);
    
    if (!activeChat) return null;
    
    return (
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={handleBackToList} className="mr-1">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="" />
            <AvatarFallback className="bg-[rgba(13,38,75,1)] text-white">
              {activeChat.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h3 className="font-medium text-gray-900 truncate">{activeChat.name}</h3>
              {activeChat.status === "online" && (
                <Badge variant="outline" className="ml-2 bg-white text-green-600 border-green-600 text-xs px-2">
                  Online
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-500">{activeChat.role}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Video className="h-5 w-5 text-[rgba(13,38,75,1)]" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Phone className="h-5 w-5 text-[rgba(13,38,75,1)]" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'agent' && (
                  <Avatar className="h-8 w-8 mr-2 mt-1">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-[rgba(13,38,75,1)] text-white">
                      {activeChat.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div>
                  {message.type === 'audio' ? (
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.sender === 'user' 
                        ? 'bg-[rgba(138,112,250,1)] text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className={`h-8 w-8 rounded-full ${
                          message.sender === 'user' ? 'text-white bg-[rgba(128,102,240,0.3)]' : 'text-gray-700 bg-gray-200'
                        }`}>
                          <Play className="h-4 w-4" />
                        </Button>
                        <div className="flex-1">
                          <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <span className="text-xs">{message.duration}</span>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className={`max-w-[260px] px-4 py-3 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-[rgba(138,112,250,1)] text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  )}
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-gray-500">{message.time}</p>
                    {message.sender === 'user' && (
                      <Check className="h-3 w-3 ml-1 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {activeChat.typing && (
              <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[rgba(13,38,75,1)] text-white text-xs">
                    {activeChat.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span>{activeChat.name} is typing...</span>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full bg-[rgba(138,112,250,0.1)]">
              <Plus className="h-5 w-5 text-[rgba(138,112,250,1)]" />
            </Button>
            <Input
              placeholder="Type here..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 rounded-full border-gray-200"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
            />
            <Button variant="ghost" size="icon" className="rounded-full">
              <Mic className="h-5 w-5 text-[rgba(13,38,75,1)]" />
            </Button>
            <Button 
              onClick={sendMessage}
              disabled={!messageText.trim()}
              className="rounded-full bg-[rgba(138,112,250,1)] hover:bg-[rgba(128,102,240,1)] text-white transition-colors"
              size="icon"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="container mx-auto p-0 md:p-4 h-[calc(100vh-200px)]">
      <div className="bg-white rounded-lg shadow h-full flex overflow-hidden">
        {isMobile ? (
          <Tabs 
            className="w-full flex flex-col" 
            defaultValue="chats" 
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsContent value="chats" className="flex-1 m-0 h-full">
              {renderConversationList()}
            </TabsContent>
            <TabsContent value="conversation" className="flex-1 m-0 h-full">
              {renderConversationView()}
            </TabsContent>
          </Tabs>
        ) : (
          <>
            <div className="w-1/3 border-r border-gray-200 h-full">
              {renderConversationList()}
            </div>
            <div className="flex-1 h-full">
              {renderConversationView()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Add this component for the play button
const Play = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
