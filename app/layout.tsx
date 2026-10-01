import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import SocialSidebar from "@/components/layout/SocialSidebar";
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rayanwellness.com"),
  title: {
    default: "Massage, Yoga & Recovery Therapy in Matugama, Sri Lanka",
    template: "%s | Rayan's Recovery & Wellness Center",
  },
  description:
    "Sports massage, deep tissue, Thai massage therapy and hot stone treatments plus yoga in Keeranthidiya, Matugama. Personalized recovery sessions — book via WhatsApp.",
  alternates: {
    canonical: "/",
  },
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
      <body className="min-h-full flex flex-col">
        <Navbar />
        <SocialSidebar />
        {children}
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-5QV37LBFK4" />
    </html>
  );
}