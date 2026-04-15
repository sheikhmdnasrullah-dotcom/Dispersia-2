import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import DevToolbar from "@/components/DevToolbar";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('dyspersia-theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className="grain" style={{ minHeight: "100vh", paddingBottom: "32px" }} suppressHydrationWarning>
        {children}
        <DevToolbar />
      </body>
    </html>
  );
}
