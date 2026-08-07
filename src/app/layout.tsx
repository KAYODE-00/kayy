import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Exo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PortfolioProvider } from "@/components/PortfolioProvider";
import SmoothScroll from "@/components/SmoothScroll";

const exo = Exo({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  variable: "--font-exo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ABDULWAHAB KAYODE",
  description: "Yoo man,this is my portfolio",
  icons: {
    icon: "https://avatars.githubusercontent.com/u/205503013?s=96&v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        exo.variable
      )}
    >
      <body className="min-h-full flex flex-col font-exo">
        <SmoothScroll>
          <PortfolioProvider>{children}</PortfolioProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
