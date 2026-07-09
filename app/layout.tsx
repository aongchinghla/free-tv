import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "FreeTV",
  description:
    "Watch live free TV.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="bg-void-900 min-h-screen antialiased">
        <div className="fixed inset-0 -z-10 bg-stadium-grad" />
        <main className="mx-auto flex flex-col justify-center min-h-[100dvh] max-w-[1600px] px-3 pb-4 sm:px-6 sm:pb-4 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}