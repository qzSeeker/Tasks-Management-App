import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "./components/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Manage Your Daily Tasks Easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        <NavBar/>
        <main>{children}</main>
        {/* footer */}
        <div className="text-center h-[8rem] flex justify-center items-center text-sm">
          Developed & Designed with ❤️ by Arpit Yadav
        </div>
      </body>
    </html>
  );
}
