import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/context/SessionProvider";
import { Toaster } from "sonner";
import ToastProviders from "@/context/ToastProviders";
import ReduxProvider from "@/context/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online Store Management",
  description: "You can start your business with us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    
    >
      <body   className={`${geistSans.variable} ${geistMono.variable}  antialiased`}>

    <ToastProviders>
      <SessionProvider>
        <ReduxProvider>{children}</ReduxProvider>
      </SessionProvider>
    </ToastProviders>

      </body>
    </html>
  );
}
