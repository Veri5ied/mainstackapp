import type { Metadata } from "next";
import "./globals.css";
import "../sass/main.scss";
import { ReactQueryProvider } from "@/provider/ReactQueryProvider";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Mainstack",
  description: "Mainstack app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ReactQueryProvider>
  );
}
