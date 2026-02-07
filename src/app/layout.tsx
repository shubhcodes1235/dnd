import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Caveat, Patrick_Hand, Indie_Flower } from "next/font/google";
import "./globals.css";

// Providers
import { DatabaseProvider } from "@/providers/database-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { SoundProvider } from "@/providers/sound-provider";
import { CelebrationProvider } from "@/providers/celebration-provider";
import { NotificationProvider } from "@/providers/notification-provider";
import { RootLayoutWrapper } from "@/components/layout/root-layout-wrapper";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-handwritten" });
const patrickHand = Patrick_Hand({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const indieFlower = Indie_Flower({ weight: "400", subsets: ["latin"], variable: "--font-indie" });

export const metadata: Metadata = {
  title: "Dream & Design Companion",
  description: "Stay Goated 🐐 — Your creative journey companion",
  manifest: "/manifest.json",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👑</text></svg>",
    apple: "/icons/apple-touch-icon.png",
  }
};

export const viewport: Viewport = {
  themeColor: "#FF69B4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} ${caveat.variable} ${patrickHand.variable} ${indieFlower.variable} font-sans antialiased bg-background text-night-900 custom-cursor`}>
        <DatabaseProvider>
          <ThemeProvider>
            <SoundProvider>
              <CelebrationProvider>
                <NotificationProvider>
                  <RootLayoutWrapper>
                    {children}
                  </RootLayoutWrapper>
                </NotificationProvider>
              </CelebrationProvider>
            </SoundProvider>
          </ThemeProvider>
        </DatabaseProvider>
      </body>
    </html>
  );
}
