import type { Metadata } from "next";
import { shareTags } from "@/lib/seo";
import { BUSINESS_NAME } from "@/lib/site";

const HOME_TITLE = "Massage, Yoga & Recovery Therapy in Matugama, Sri Lanka";
const HOME_DESCRIPTION =
  "Sports massage, deep tissue, Thai massage therapy and hot stone treatments plus yoga in Keeranthidiya, Matugama. Personalized recovery sessions — book via WhatsApp.";
import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Analytics } from '@vercel/analytics/next';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rayanwellness.com"),
  title: {
    default: HOME_TITLE,
    template: "%s | Rayan's Recovery & Wellness Center",
  },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  // Link preview for the home page (each other page sets its own).
  ...shareTags({ title: `${HOME_TITLE} | ${BUSINESS_NAME}`, description: HOME_DESCRIPTION, path: "/" }),
};

const TOP_BAR_SCRIPT = `(function(){var d=document.documentElement;function u(){var y=window.pageYOffset||d.scrollTop||0;if(y<24){d.setAttribute('data-top','')}else{d.removeAttribute('data-top')}}u();window.addEventListener('scroll',u,false);})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      // The script below adds data-top before React loads.
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Plain old-style JavaScript (works on old iPhones): marks the page as
            "at the top" so the top bar can be clear there. Runs before the bar is
            drawn, so it never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: TOP_BAR_SCRIPT }} />
        <Navbar />
        <WhatsAppButton />
        {children}
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-5QV37LBFK4" />
    </html>
  );
}