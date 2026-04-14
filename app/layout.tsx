import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dyspersia — AI Brain for Podcast Creators",
  description:
    "Upload one episode. Get clips, captions, show notes, titles, newsletters, thumbnails and more. All written in your exact voice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="grid-bg" style={{ minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
