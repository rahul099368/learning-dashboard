import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeuralPath — Learning Dashboard",
  description: "Your personalized AI-powered learning dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-base text-slate-200 font-body antialiased">
        {children}
      </body>
    </html>
  );
}
