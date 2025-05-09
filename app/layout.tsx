import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
import "./globals.css";
import { ContextProvider } from "./user-provider";

const quicksand = Kode_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "DataMind AI",
  description: "Transform Your Data Experience ! Convert natural language to database queries and visualize your data structure with powerful AI tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.className} antialiased`}
      >
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
