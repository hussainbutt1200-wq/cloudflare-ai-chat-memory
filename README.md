# 🚀 Cloudflare AI Chat Memory

An AI-powered chat application built using **Cloudflare Workers**, **Workers AI (Llama 3.3)**, and **Durable Objects** to enable persistent, stateful conversations at the edge.

---

## 🌐 Live Demo
👉 https://my-ai-app.hussain-butt1200.workers.dev/

---

## 📂 GitHub Repository
👉 https://github.com/hussainbutt1200-wq/cloudflare-ai-chat-memory

---

## 🧠 Overview

This project demonstrates how to build a **stateful AI application on Cloudflare**.  
Unlike typical chatbots, this app **remembers previous messages** using Durable Objects, allowing for real conversational context.

It showcases how modern edge infrastructure can be used to deploy scalable AI applications without traditional backend servers.

---

## ✨ Features

- 🤖 AI Chat powered by **Workers AI (Llama 3.3)**
- 🧠 Persistent memory using **Durable Objects**
- ⚡ Fully serverless backend using **Cloudflare Workers**
- 💬 Real-time chat interface (HTML/CSS/JS)
- 🔁 Context-aware conversations
- 🧹 Clear chat functionality
- 🌍 Deployed globally via Cloudflare Edge

---

## 🏗️ Architecture
User (Browser UI)
↓
Cloudflare Worker (API + Logic)
↓
Durable Object (Chat Memory)
↓
Workers AI (Llama 3.3 Model)
↓
Response → User

---

## 🛠️ Tech Stack

- **Cloudflare Workers**
- **Workers AI**
- **Durable Objects**
- **JavaScript**
- **HTML / CSS**
- **Wrangler CLI**

---

## ⚙️ How It Works

1. User sends a message via chat UI
2. Request is handled by Cloudflare Worker
3. Worker stores/retrieves conversation from Durable Object
4. Full chat history is sent to Workers AI
5. AI generates a response
6. Response is returned and saved for future context

---

## 🧪 Try It Yourself

Open the app and test:
My name is Hussain
What is my name?

✅ The AI will remember your name using Durable Object memory

---

## 💻 Local Development

Clone the repository:

```bash
git clone https://github.com/hussainbutt1200-wq/cloudflare-ai-chat-memory.git
cd cloudflare-ai-chat-memory
Install dependencies: npm install
Run locally:npx wrangler dev
Deploy:npx wrangler deploy

---

## 📚 What I Learned
Building AI apps directly on the edge using Cloudflare
Using Durable Objects for state management
Integrating LLMs (Llama 3.3) into real applications
Designing serverless backend architecture

## 🔮 Future Improvements
👤 User authentication (multi-user chat sessions)
🎤 Voice input (speech-to-text)
📊 Chat history UI improvements
🔍 Retrieval-augmented generation (RAG)
🎨 Better UI/UX design and animations

## 👨‍💻 Author

Hussain Hassan Butt
GitHub: https://github.com/hussainbutt1200-wq

## ⭐ Why This Project Matters

This project demonstrates:

Real-world use of AI + Backend Systems
Understanding of Cloudflare ecosystem
Ability to build scalable, production-ready applications
<img width="1882" height="913" alt="image" src="https://github.com/user-attachments/assets/733651d0-dc3c-43ef-ac75-195db9e9b771" />

