import Header from "@/components/shared/header/header";
 
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col">
        <div className="flex flex-1 flex-col items-center p-6">
          {children}
        </div>
      </main>
    </>
  );
}