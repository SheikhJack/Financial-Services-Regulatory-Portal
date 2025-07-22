import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider, ClerkHostRouter } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Financial Reporting System",
  description: "Financial Reporting System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ClerkHostRouter>
        <html lang="en">
          <body className={inter.className}>
            {children} <ToastContainer position="bottom-right" theme="dark" />
          </body>
        </html>
      </ClerkHostRouter>
    </ClerkProvider>
  );
}
