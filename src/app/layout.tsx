import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "StayHealthy",
  description: "Your Health, Your Schedule. Connect with top doctors and specialists from the comfort of your home.",
  keywords: ["doctor appointment", "remote doctor access", "online healthcare", "virtual consultation", "medical specialist", "telemedicine"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
       </head>
      <body className={cn("font-body antialiased", fontBody.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
