"use client";
import { ArrowUpRight, MessageCircle } from "lucide-react";
export default function MobileBookingBar({
  onBook,
  onChat,
}: {
  onBook: () => void;
  onChat: () => void;
}) {
  return (
    <div className="mobile-booking-bar">
      <button aria-label="Ask on WhatsApp" onClick={onChat}>
        <MessageCircle size={21} />
      </button>
      <button onClick={onBook}>
        Book a free trial <ArrowUpRight size={18} />
      </button>
    </div>
  );
}
