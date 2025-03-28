import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Darker_Grotesque, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";
import { ToastProvider } from "@/provider/toast-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import Script from "next/script";
import PathProvider from "./components/PathProvider";

const inter = Inter({ subsets: ["latin"] });
const darker = Darker_Grotesque({ subsets: ["latin"], weight: "500" });
const plus = Plus_Jakarta_Sans({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "Hệ thống đặt lịch dọn dẹp trực tuyến",
  description: "Hệ thống đặt lịch dọn dẹp và vệ sinh",
  icons: [
    {
      rel: 'icon',
      sizes: '32x32',
      url: '/logo.svg',
    },
  ]
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        <Script
          src="/assets/scripts/lang-config.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/scripts/translation.js"
          strategy="beforeInteractive"
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />


        <link rel="icon" href="/logo.svg" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet" />
      </head>
      <body className={plus.className}>
        <SessionProvider session={session}>
          <PathProvider />
          <NextSSRPlugin
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <ToastProvider />
          <ThemeProvider attribute="class" defaultTheme="light">
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

