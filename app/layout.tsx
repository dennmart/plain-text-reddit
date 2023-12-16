import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plain Text Reddit",
  description: "Read your favorite subreddits in plain text",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <div className="container mx-auto p-4">
            <h1 className="text-center text-2xl font-bold">
              Plain Text Reddit
            </h1>

            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
