"use client";
import { MessageCircle } from "lucide-react";
export default function WhatsAppButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="whatsapp-float"
      onClick={onClick}
      aria-label="Ask about Areesan on WhatsApp"
    >
      <MessageCircle size={22} />
      <span>Let’s talk</span>
      <span className="online-dot" />
    </button>
  );
}
