import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Talitrix - Electronic Monitoring ",
  description:
    "The Talitrix solution suite includes supervision web-based software, mobile applications and first-to-market tamper-resistant independent wrist wearable electronic monitoring with real-time tracking and biometric data capture. For more information, visit talitrix.com.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` h-full antialiased`}>
      <body className="min-h-full">
        <NavBar />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
