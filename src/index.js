import { DurableObject } from "cloudflare:workers";

export class ChatMemory extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
  }

  async fetch(request) {
    const body = await request.json().catch(() => ({}));
	
    const action = body.action || "add";
    let history = (await this.ctx.storage.get("history")) || [];

    if (action === "get") {
      return Response.json({ history });
    }

    if (action === "clear") {
      await this.ctx.storage.put("history", []);
      return Response.json({ history: [] });
    }

    if (body.role && body.content) {
      history.push({ role: body.role, content: body.content });
      await this.ctx.storage.put("history", history);
    }

    return Response.json({ history });
  }
}

export default {
  async fetch(request, env) {
    if (request.method === "GET") {
      return new Response(html, {
        headers: { "Content-Type": "text/html; charset=UTF-8" }
      });
    }

    const body = await request.json().catch(() => ({}));
	if (body.action === "clear") {
  const id = env.CHAT.idFromName("global");
  const stub = env.CHAT.get(id);

  await stub.fetch("https://chat/clear", {
    method: "POST",
    body: JSON.stringify({ action: "clear" })
  });

  return Response.json({ success: true });
}
    const userMessage = body.message || "Hello";

    const id = env.CHAT.idFromName("global");
    const stub = env.CHAT.get(id);

    await stub.fetch("https://chat/add", {
      method: "POST",
      body: JSON.stringify({
        role: "user",
        content: userMessage
      })
    });

    const historyRes = await stub.fetch("https://chat/get", {
      method: "POST",
      body: JSON.stringify({ action: "get" })
    });

    const { history } = await historyRes.json();

    const aiResponse = await env.AI.run(
      "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      { messages: history }
    );

    await stub.fetch("https://chat/add", {
      method: "POST",
      body: JSON.stringify({
        role: "assistant",
        content: aiResponse.response
      })
    });

    return Response.json(aiResponse);
  }
};

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cloudflare AI Chat</title>
  <style>
    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: Inter, Arial, sans-serif;
      background: linear-gradient(135deg, #0f172a, #1e293b, #0b1120);
      color: #e5e7eb;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px;
    }

    .app {
      width: 100%;
      max-width: 950px;
      height: 90vh;
      background: rgba(15, 23, 42, 0.82);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 24px;
      backdrop-filter: blur(18px);
      box-shadow: 0 20px 60px rgba(0,0,0,0.35);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .topbar {
      padding: 22px 24px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      background: rgba(255,255,255,0.02);
    }

    .brand {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .brand h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
      color: #ffffff;
    }

    .brand p {
      margin: 0;
      color: #94a3b8;
      font-size: 14px;
    }

    .actions {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    button {
      border: none;
      border-radius: 12px;
      padding: 12px 16px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s ease;
    }

    .clear-btn {
      background: rgba(255,255,255,0.08);
      color: #e2e8f0;
    }

    .clear-btn:hover {
      background: rgba(255,255,255,0.14);
    }

    .chat {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      background:
        radial-gradient(circle at top right, rgba(59,130,246,0.10), transparent 25%),
        radial-gradient(circle at bottom left, rgba(168,85,247,0.10), transparent 25%);
    }

    .welcome {
      padding: 18px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.03);
      border-radius: 18px;
      color: #cbd5e1;
      line-height: 1.6;
    }

    .msg-row {
      display: flex;
      width: 100%;
    }

    .msg-row.user {
      justify-content: flex-end;
    }

    .msg-row.assistant {
      justify-content: flex-start;
    }

    .msg {
      max-width: 75%;
      padding: 14px 16px;
      border-radius: 18px;
      line-height: 1.6;
      white-space: pre-wrap;
      word-wrap: break-word;
      box-shadow: 0 8px 20px rgba(0,0,0,0.18);
    }

    .msg.user {
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      color: white;
      border-bottom-right-radius: 6px;
    }

    .msg.assistant {
      background: rgba(255,255,255,0.07);
      color: #e5e7eb;
      border: 1px solid rgba(255,255,255,0.06);
      border-bottom-left-radius: 6px;
    }

    .label {
      font-size: 12px;
      margin-bottom: 6px;
      opacity: 0.75;
      font-weight: 700;
      letter-spacing: 0.3px;
    }

    .composer {
      padding: 18px 20px 20px;
      border-top: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.02);
    }

    .input-wrap {
      display: flex;
      gap: 12px;
      align-items: flex-end;
    }

    textarea {
      flex: 1;
      resize: none;
      min-height: 64px;
      max-height: 180px;
      padding: 16px;
      border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.08);
      outline: none;
      background: rgba(15,23,42,0.85);
      color: white;
      font-size: 15px;
      line-height: 1.5;
    }

    textarea::placeholder {
      color: #94a3b8;
    }

    .send-btn {
      min-width: 120px;
      height: 56px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      box-shadow: 0 10px 24px rgba(59,130,246,0.25);
    }

    .send-btn:hover {
      transform: translateY(-1px);
      opacity: 0.96;
    }

    .send-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .footer-note {
      margin-top: 10px;
      font-size: 12px;
      color: #94a3b8;
      text-align: center;
    }

    @media (max-width: 700px) {
      .app {
        height: 95vh;
        border-radius: 18px;
      }

      .topbar {
        flex-direction: column;
        align-items: flex-start;
      }

      .input-wrap {
        flex-direction: column;
      }

      .send-btn {
        width: 100%;
      }

      .msg {
        max-width: 90%;
      }
    }
  </style>
</head>
<body>
  <div class="app">
    <div class="topbar">
      <div class="brand">
        <h1>Cloudflare AI Chat</h1>
        <p>Workers AI + Durable Objects memory</p>
      </div>
      <div class="actions">
        <button class="clear-btn" onclick="clearChat()">Clear Chat</button>
      </div>
    </div>

    <div id="chat" class="chat">
      <div class="welcome">
        <strong>Welcome.</strong><br>
        This AI app is built on Cloudflare using <strong>Workers AI</strong> and <strong>Durable Objects</strong>.
        It can remember previous messages in the conversation.
      </div>
    </div>

    <div class="composer">
      <div class="input-wrap">
        <textarea id="input" placeholder="Type your message..."></textarea>
        <button id="sendBtn" class="send-btn" onclick="sendMessage()">Send</button>
      </div>
      <div class="footer-note">Built by Hussain Hassan Butt</div>
    </div>
  </div>

  <script>
    const chat = document.getElementById("chat");
    const input = document.getElementById("input");
    const sendBtn = document.getElementById("sendBtn");

    function addMessage(role, content) {
      const row = document.createElement("div");
      row.className = "msg-row " + role;

      const box = document.createElement("div");
      box.className = "msg " + role;

      const label = document.createElement("div");
      label.className = "label";
      label.textContent = role === "user" ? "You" : "AI Assistant";

      const text = document.createElement("div");
      text.textContent = content;

      box.appendChild(label);
      box.appendChild(text);
      row.appendChild(box);
      chat.appendChild(row);
      chat.scrollTop = chat.scrollHeight;
    }

    async function sendMessage() {
      const text = input.value.trim();
      if (!text) return;

      addMessage("user", text);
      input.value = "";
      sendBtn.disabled = true;
      sendBtn.textContent = "Sending...";

      try {
        const res = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text })
        });

        const data = await res.json();
        addMessage("assistant", data.response || "No response");
      } catch (err) {
        addMessage("assistant", "Something went wrong while getting a response.");
      } finally {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send";
      }
    }

    async function clearChat() {
      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "clear" })
        });

        chat.innerHTML = \`
          <div class="welcome">
            <strong>Chat cleared.</strong><br>
            Start a new conversation with your AI assistant.
          </div>
        \`;
      } catch (err) {
        alert("Unable to clear chat right now.");
      }
    }

    input.addEventListener("keydown", function(e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  </script>
</body>
</html>`;