import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send, Bot } from "lucide-react";
import MessageBubble from "../components/MessageBubble";

export default function GuardianAI() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initConversation = async () => {
      const conv = await base44.agents.createConversation({
        agent_name: "guardian",
        metadata: {
          name: "Guardian AI Chat",
          description: "Medical and safety assistance"
        }
      });
      setConversation(conv);
    };

    initConversation();
  }, []);

  useEffect(() => {
    if (!conversation) return;

    const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [conversation]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !conversation || isLoading) return;

    setIsLoading(true);
    setInputMessage("");

    await base44.agents.addMessage(conversation, {
      role: "user",
      content: inputMessage
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 p-4 md:p-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Guardian AI</h1>
              <p className="text-gray-600">Bates College Medical and Safety Assistance</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <Card className="flex-1 shadow-lg flex flex-col overflow-hidden">
          <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <Bot className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    How can I help you today?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Ask about medical concerns, safety issues, AED locations, or emergency procedures on campus.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))
            )}
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Guardian is thinking...</span>
              </div>
            )}
          </CardContent>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Describe your medical or safety concern..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading || !conversation}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || !conversation}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}