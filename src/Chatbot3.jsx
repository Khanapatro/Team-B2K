import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Recycle, Trash2, Leaf, AlertCircle } from 'lucide-react';

const WasteSegregationChatbot = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm EcoBot, your smart waste segregation assistant. I can help you identify how to properly dispose of items, learn about recycling guidelines, and make your waste management more efficient. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const wasteCategories = {
    'organic': {
      items: ['food scraps', 'fruit peels', 'vegetable waste', 'garden waste', 'paper towels'],
      bin: 'Green Bin (Compostable)',
      icon: <Leaf className="w-4 h-4" />
    },
    'recyclable': {
      items: ['plastic bottles', 'glass containers', 'aluminum cans', 'cardboard', 'paper', 'magazines'],
      bin: 'Blue Bin (Recyclable)',
      icon: <Recycle className="w-4 h-4" />
    },
    'hazardous': {
      items: ['batteries', 'electronics', 'paint', 'chemicals', 'light bulbs', 'motor oil'],
      bin: 'Special Collection (Hazardous)',
      icon: <AlertCircle className="w-4 h-4" />
    },
    'general': {
      items: ['tissues', 'diapers', 'cigarette butts', 'broken ceramics', 'rubber items'],
      bin: 'Red Bin (General Waste)',
      icon: <Trash2 className="w-4 h-4" />
    }
  };

  const getWasteCategory = (item) => {
    const lowerItem = item.toLowerCase();
    for (const [category, data] of Object.entries(wasteCategories)) {
      if (data.items.some(wasteItem => lowerItem.includes(wasteItem) || wasteItem.includes(lowerItem))) {
        return { category, ...data };
      }
    }
    return null;
  };

  const generateBotResponse = (userMessage) => {
      const message = userMessage.toLowerCase();

// Check for waste item identification
      const wasteInfo = getWasteCategory(message);
      if (wasteInfo) {
        return `Great question! ${userMessage} should go in the **${wasteInfo.bin}**. 
      This is because it's classified as ${wasteInfo.category} waste. 
      Remember to clean containers before recycling and remove any non-recyclable parts!`;
      }


    // Predefined responses for common queries
    if (message.includes('how') && (message.includes('separate') || message.includes('segregate'))) {
      return "Here's how to segregate waste effectively:\n\n🟢 *Green Bin: Organic waste (food scraps, garden waste)\n🔵 **Blue Bin: Recyclables (plastic, glass, paper, metal)\n🔴 **Red Bin: General waste (non-recyclable items)\n⚠ **Special Collection*: Hazardous materials (batteries, electronics)\n\nAlways clean containers and check local guidelines!";
    }

    if (message.includes('plastic') && message.includes('type')) {
      return "Plastic types and their disposal:\n\n♻ *Recyclable: PET (#1), HDPE (#2), PP (#5)\n🗑 **Non-recyclable*: PVC (#3), LDPE (#4), PS (#6), Other (#7)\n\nLook for the recycling symbol with numbers on plastic items. When in doubt, check with your local recycling center!";
    }

    if (message.includes('benefit') || message.includes('why recycle')) {
      return "Recycling benefits include:\n\n🌍 Reduces landfill waste by up to 75%\n💧 Saves water and energy in manufacturing\n🌱 Prevents pollution and protects ecosystems\n💰 Creates jobs in the green economy\n📉 Reduces greenhouse gas emissions\n\nEvery item properly recycled makes a difference!";
    }

    if (message.includes('compost')) {
      return "Composting tips:\n\n✅ *Add: Fruit/vegetable scraps, coffee grounds, eggshells, yard trimmings\n❌ **Avoid*: Meat, dairy, oils, pet waste, diseased plants\n\n🌡 Maintain 130-160°F temperature\n💧 Keep moist but not soggy\n🔄 Turn regularly for aeration\n\nCompost is ready in 2-6 months!";
    }

    // Default responses for unrecognized queries
    const defaultResponses = [
      "I'd be happy to help with waste segregation! Try asking me about specific items like 'where does a plastic bottle go?' or 'how do I dispose of batteries?'",
      "Ask me about any waste item and I'll tell you exactly where it belongs! I can also explain recycling processes and composting tips.",
      "I'm here to make waste segregation simple! Tell me what item you need to dispose of, or ask about recycling guidelines."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "How do I segregate waste?", icon: <Recycle className="w-4 h-4" /> },
    { text: "Where does plastic go?", icon: <Trash2 className="w-4 h-4" /> },
    { text: "Composting tips", icon: <Leaf className="w-4 h-4" /> },
    { text: "Battery disposal", icon: <AlertCircle className="w-4 h-4" /> }
  ];

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300 group"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      </div>
    );
  }

  return (
  <div className="fixed inset-0 z-50 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col overflow-hidden border-2 border-green-200">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-full">
            <Recycle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">EcoBot Assistant</h2>
            <p className="text-green-100 text-sm">Smart Waste Segregation Guide</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(false)}
          className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-green-50/50 to-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] p-4 rounded-2xl shadow-lg ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  : 'bg-white border-2 border-green-200 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              <span
                className={`text-xs mt-2 block ${
                  message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                }`}
              >
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border-2 border-green-200 p-4 rounded-2xl shadow-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Always scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-3 bg-green-50 border-t border-green-200">
        <p className="text-sm text-green-700 mb-3 font-medium">Quick Actions:</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                setInputMessage(action.text);
                handleSendMessage();
              }}
              className="flex items-center space-x-2 bg-white hover:bg-green-100 border-2 border-green-300 text-green-700 px-3 py-2 rounded-full text-sm transition-all duration-200 hover:shadow-md"
            >
              {action.icon}
              <span>{action.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t-2 border-green-200">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about waste disposal, recycling tips, or item classification..."
            className="flex-1 border-2 border-green-300 rounded-2xl px-4 py-3 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all bg-green-50/50"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-2xl transition-all duration-200 hover:shadow-lg transform hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-green-600 mt-2 text-center">
          💡 Try asking: "Where does a glass bottle go?" or "How to compost food waste?"
        </p>
      </div>
    </div>
  </div>
);

};

export default WasteSegregationChatbot;