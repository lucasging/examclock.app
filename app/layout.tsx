import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Exam Clock",
  description: "An exam clock with no ads that keeps your screen on.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body
      >
        {children}
      </body>
    </html>
  );
}
