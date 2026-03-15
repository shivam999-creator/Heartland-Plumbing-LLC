import { GoogleGenAI } from "@google/genai";

document.addEventListener('DOMContentLoaded', () => {
  const chatbotHTML = `
    <div id="chatbot-container">
      <div class="chat-bubble" id="chat-bubble">
        💬
        <div class="chat-badge">1</div>
      </div>
      <div class="chat-window" id="chat-window">
        <div class="chat-header">
          <span>🇺🇸 Heartland Plumbing AI</span>
          <span class="chat-close" id="chat-close">✕</span>
        </div>
        <div class="chat-messages" id="chat-messages"></div>
        <div class="chat-input-area">
          <input type="text" id="chat-input" placeholder="Type a message..." autocomplete="off">
          <button class="chat-send" id="chat-send">➤</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  const bubble = document.getElementById('chat-bubble');
  const windowEl = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close');
  const messagesEl = document.getElementById('chat-messages');
  const inputEl = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const badge = document.querySelector('.chat-badge');

  let chat;
  let isInitialized = false;
  let isTyping = false;

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const initGeminiChat = () => {
    chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are a helpful, friendly, and professional receptionist for Heartland Plumbing LLC, a veteran-owned plumbing service in Cape Coral, FL serving Lee and Collier County. Your goal is to answer customer questions, provide information about plumbing services (water heaters, repiping, drain cleaning, renovations), and encourage them to call (239) 333-7807 or get a free quote. Keep your responses concise, friendly, and helpful. Do not use markdown formatting like bolding or italics, just plain text. If it's an emergency, tell them to call immediately.",
      },
    });
  };

  const addMessage = (text, sender) => {
    const msg = document.createElement('div');
    msg.className = `msg msg-${sender}`;
    msg.textContent = text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  const showTyping = () => {
    const typingMsg = document.createElement('div');
    typingMsg.className = 'msg msg-bot typing-indicator';
    typingMsg.id = 'typing-indicator';
    typingMsg.textContent = '...';
    messagesEl.appendChild(typingMsg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  const hideTyping = () => {
    const typingMsg = document.getElementById('typing-indicator');
    if (typingMsg) typingMsg.remove();
  };

  const handleUserInput = async () => {
    const text = inputEl.value.trim();
    if (!text || isTyping) return;
    
    addMessage(text, 'user');
    inputEl.value = '';
    isTyping = true;
    showTyping();

    try {
      const response = await chat.sendMessage({ message: text });
      hideTyping();
      addMessage(response.text, 'bot');
    } catch (error) {
      console.error("Chatbot Error:", error);
      hideTyping();
      addMessage("I'm sorry, I'm having trouble connecting right now. Please call us at (239) 333-7807 for immediate assistance.", 'bot');
    } finally {
      isTyping = false;
    }
  };

  const initChat = () => {
    if (!isInitialized) {
      initGeminiChat();
      addMessage("👋 Hey there! I'm the Heartland Plumbing AI assistant. How can I help you today?", 'bot');
      isInitialized = true;
    }
  };

  bubble.addEventListener('click', () => {
    windowEl.classList.add('active');
    bubble.style.display = 'none';
    badge.style.display = 'none';
    initChat();
  });

  closeBtn.addEventListener('click', () => {
    windowEl.classList.remove('active');
    bubble.style.display = 'flex';
  });

  sendBtn.addEventListener('click', handleUserInput);
  inputEl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleUserInput();
  });

  // Auto open after 45s
  setTimeout(() => {
    if (!windowEl.classList.contains('active')) {
      bubble.click();
    }
  }, 45000);
});
