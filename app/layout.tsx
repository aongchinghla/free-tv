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
        <main className="min-h-[100dvh] w-full overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
