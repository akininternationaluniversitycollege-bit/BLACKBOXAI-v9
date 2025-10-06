curl -X POST https://your-deployed-url/api/chat \
-H "Content-Type: application/json" \
-H "x-access-key: AKIN_SECRET_2025" \
-d '{"prompt": "Hello AI"}'
/**
 * BLACKBOX-AI-v9
 * Private AI Integration Server (All-in-One)
 * Author: Akin International University College
 */

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ INSERT YOUR PRIVATE API KEY BELOW
const BLACKBOX_API_KEY = "sk-Ql-Z_4Mih0CO6DbMvzVpxg";  // 👈 replace this with your key

// ✅ Optional: Personal access password (so only you can use it)
const ACCESS_KEY = "AKIN_SECRET_2025"; // change if you want

// Health route
app.get("/", (req, res) => {
  res.json({
    status: "✅ Blackbox AI v9 Server is Live",
    author: "Akin International University College",
    secured: true,
  });
});

// Main AI chat route
app.post("/api/chat", async (req, res) => {
  const { prompt } = req.body;
  const accessHeader = req.headers["x-access-key"];

  if (!accessHeader || accessHeader !== ACCESS_KEY) {
    return res.status(403).json({ error: "Unauthorized: Invalid Access Key" });
  }

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const response = await fetch("https://www.blackbox.ai/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BLACKBOX_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Blackbox API Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
