import type { Metadata } from "next";
import "./globals.css";
import { AudioProvider } from "@/lib/audio/AudioProvider";

export const metadata: Metadata = {
  title: "Pico-Fi",
  description: "Feel better. Focus better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`antialiased`}>
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
