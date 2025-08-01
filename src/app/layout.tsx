import { lato } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import ReduxProvider from "@/lib/redux/provider";
import Toast from "@/components/shared/Toast";
import { ToastProvider } from "@/components/layout/ToastProvider";
import { PersistAuth } from "@/utils";
export const metadata: Metadata = {
  title: "Terramo Tool",
  description: "Terramo tool survey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable}`}>
        {/* <Toast/> */}
        <ToastProvider />
        <ReduxProvider>
          <PersistAuth/>
          {children}
        </ReduxProvider>
        </body>
    </html>
  );
}
