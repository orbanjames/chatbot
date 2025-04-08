import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const DebugChatBot = () => {
  const [code, setCode] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const simulateAIResponse = (userCode) => {
    if (!userCode) return "⚠️ No code provided. Please paste your code.";

    if (userCode.includes("mergeMap")) {
      return "⚠️ Issue Detected:\nYou're using mergeMap, which may lead to concurrency issues. Consider using concatMap instead.";
    }

    if (userCode.includes("useEffect") && userCode.includes("async")) {
      return "⚠️ React Warning:\nAvoid using async functions directly in useEffect. Define the async function inside and call it.";
    }

    return "✅ No common reactive issues found. Code looks clean!";
  };

  const handleAnalyze = () => {
    if (!code) return;
    setLoading(true);

    const newChat = [...chat, { role: 'user', text: code }];
    setChat(newChat);

    setTimeout(() => {
      const response = simulateAIResponse(code);
      setChat([...newChat, { role: 'bot', text: response }]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      {/* Left Panel: Code Input */}
      <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles color="#7c3aed" /> Paste Your Code
        </h2>
        <textarea
          rows={14}
          placeholder="Paste your RxJS / React code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '15px', fontFamily: 'monospace' }}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Analyzing...' : 'Fix Suggestion'}
        </button>
      </div>

      {/* Right Panel: Chatbot */}
      <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '10px', padding: '20px', maxHeight: '600px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>🤖 Debugging Assistant</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          {chat.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? '#cfe8ff' : '#f4f4f5',
                padding: '10px',
                borderRadius: '10px',
                maxWidth: '80%',
                whiteSpace: 'pre-line',
              }}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div style={{ color: 'gray' }}>Thinking...</div>}
        </div>
      </div>
    </div>
  );
};

export default DebugChatBot;
