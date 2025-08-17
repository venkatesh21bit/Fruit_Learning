// Layout Component - Root layout for the entire application
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Using Newly Created Components - Navigation component
import { Navigation } from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fruit Learning App - Educational Tool for Kids",
  description: "An interactive, autism-friendly educational app for children to learn about fruits and their nutritional values through engaging games and quizzes.",
  keywords: "education, autism, children, fruits, nutrition, learning, interactive",
  authors: [{ name: "Fruit Learning Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Layout Component - Main layout structure
// Properties (props) - Component accepting children prop
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        // Styling - Dynamic class application
        className={`${inter.variable} antialiased h-full bg-gradient-to-br from-blue-50 to-green-50`}
      >
        {/* Nested Components - Navigation component nested in layout */}
        <Navigation />
        <main className="min-h-screen">
          {/* props - Rendering children prop */}
          {children}
        </main>
      </body>
    </html>
  );
}
