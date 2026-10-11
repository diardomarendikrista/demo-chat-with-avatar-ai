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
  const [messages, setMessages] = useState([
    {
      isYou: false,
      message:
        "Halo! Saya Rompy, avatar 3D pemandu demo teknologi ini. Ada yang ingin kamu tanyakan seputar teknologi demo avatar 3D ini?",
    },
  ]);
  const [aiLoading, setAiLoading] = useState(false);
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
      const res = await axios.post("/.netlify/functions/chat-gemini", {
        messages: userText,
      });

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

      // Hitung durasi avatar bicara (klip animasi talking berdurasi 5.45s, batasi maksimal 5s agar transisi ke idle mulus)
      const talkDuration = Math.min(Math.max(reply.length * 50, 2000), 5000);
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

  // Animasi avatar menyapa saat pertama kali dibuka (0 token)
  useEffect(() => {
    setIsTalking(true);
    const timer = setTimeout(() => {
      setIsTalking(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [setIsTalking]);

  return (
    <ContainerChat>
      <ChatHeader>
        <div className="title">Rompy - 3D AI Guide</div>
        <div>Interactive Tech Showcase</div>
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
