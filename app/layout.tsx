import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Areesan | Transform Your Body. Elevate Your Life.",
  description: "Discover a premium fitness experience at Areesan. Expert coaching, modern facilities, and a community that moves you forward. Explore programs and membership plans.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
