import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ContainerChat,
  ChatHeader,
  InputSection,
  InputWrapper,
  ButtonWrapper,
  MessageSection,
  ChatBallon,
  MessageWrapper,
} from "./styles";
import { Button, Input } from "antd";
import { useAtom } from "jotai";
import { isTalkingAtom } from "pages/Home/store";

export default function ChatComponent() {
  const [, setIsTalking] = useAtom(isTalkingAtom);
  const [init, setInit] = useState(true); // prevent double 1st message at development (due to strictmode)

  const [messages, setMessages] = useState([]); // semua pesan disini
  const [aiLoading, setAiLoading] = useState(true); // kalo loading, disable button send biar animasi ga kacau. hehe
  const [message, setMessage] = useState(""); // buat inputan yang kita ketik

  const messageSectionRef = useRef(null);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!message || aiLoading) return;
    const userMessage = message;
    const newMessage = { isYou: true, message: userMessage };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    // scroll to bottom
    setTimeout(() => {
      if (messageSectionRef.current) {
        messageSectionRef.current.scrollTop =
          messageSectionRef.current.scrollHeight;
      }
    }, 100);

    handleAISendMessage(userMessage);
  };

  const handleAISendMessage = async (userText) => {
    setAiLoading(true);
    // kasih baloon loading
    const loadingMessage = {
      message: ". . .",
      id: "loading",
    };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    setTimeout(() => {
      if (messageSectionRef.current) {
        messageSectionRef.current.scrollTop =
          messageSectionRef.current.scrollHeight;
      }
    }, 100);

    try {
      const promptToSend =
        userText ||
        "Halo! Perkenalkan dirimu secara singkat dalam 1-2 kalimat ramah sebagai asisten AI avatar.";

      let res;
      try {
        res = await axios.post("/.netlify/functions/chat-gemini", {
          messages: promptToSend,
        });
      } catch (funcErr) {
        // Fallback untuk local dev jika fungsi Netlify tidak berjalan (404)
        const localKey =
          (typeof process !== "undefined" && process.env?.GEMINI_API_KEY) ||
          import.meta.env?.VITE_GEMINI_API_KEY ||
          import.meta.env?.GEMINI_API_KEY;

        if (localKey && (funcErr.response?.status === 404 || !funcErr.response)) {
          res = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${localKey}`,
            {
              contents: [
                {
                  parts: [{ text: promptToSend }],
                },
              ],
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        } else {
          throw funcErr;
        }
      }

      const reply =
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Maaf, saya tidak menerima respons.";

      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.id !== "loading"),
        { message: reply },
      ]);

      setIsTalking(true);

      setTimeout(() => {
        if (messageSectionRef.current) {
          messageSectionRef.current.scrollTop =
            messageSectionRef.current.scrollHeight;
        }
      }, 100);

      // Hitung durasi avatar bicara berdasarkan panjang respon teks
      const talkDuration = Math.min(Math.max(reply.length * 60, 2500), 8000);
      await new Promise((resolve) => setTimeout(resolve, talkDuration));
    } catch (err) {
      console.error("Gemini API Error:", err);
      const errorMessage =
        err.response?.data?.error?.message ||
        "Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi.";
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.id !== "loading"),
        { message: errorMessage },
      ]);
    } finally {
      setIsTalking(false);
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!init) handleAISendMessage();
  }, [init]);

  // prevent double 1st message at development (due to strictmode)
  useEffect(() => {
    setInit(false);
  }, []);

  return (
    <ContainerChat>
      <ChatHeader>
        <div className="title">I WISH</div>
        <div>Your AI Companion</div>
      </ChatHeader>

      <MessageSection ref={messageSectionRef}>
        {messages.map((item, i) => (
          <MessageWrapper
            key={i}
            $isYou={item.isYou}
          >
            <ChatBallon $isYou={item.isYou}>{item.message}</ChatBallon>
          </MessageWrapper>
        ))}
      </MessageSection>

      <form onSubmit={handleSendMessage}>
        <InputSection>
          <InputWrapper>
            <Input
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </InputWrapper>
          <ButtonWrapper>
            <Button
              type="primary"
              htmlType="submit"
              disabled={aiLoading}
            >
              Send
            </Button>
          </ButtonWrapper>
        </InputSection>
      </form>
    </ContainerChat>
  );
}
