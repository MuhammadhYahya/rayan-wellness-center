import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import SocialSidebar from "@/components/layout/SocialSidebar";
export const metadata: Metadata = {
  title: "Rayan's Recovery & Wellness Center",
  description: "Holistic recovery, massage therapy, yoga, and wellness services in Matugama, Sri Lanka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col"><Navbar /><SocialSidebar />{children}</body>
    </html>
  );
}
