import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "@/globals.css";
import { QueryProviders } from "../providers/Queryproviders";
import LazyMotionProvider from "@/providers/LazyMotionProvider";
import { cn } from "@/utils/cn";
import { Toaster } from "@/components/ui/toast";

const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/Pretendard-Regular.subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-Medium.subset.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-SemiBold.subset.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-Bold.subset.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Pretendard-ExtraBold.subset.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fesi-15-todo-nine.vercel.app"),
  title: "슬리드 투두",
  description: "투두 리스트 서비스입니다.",
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "_muejfGGuKrtJKzi3NCWl-U0BHQtUROsMPTBlJqhUlA",
  },
  openGraph: {
    title: "슬리드 투두",
    description: "투두 리스트 서비스입니다.",
    url: "/",
    siteName: "슬리드 투두",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "슬리드 투두",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={cn("h-full", "antialiased", pretendard.variable, "font-sans")}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans bg-gray-100 dark:bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme={false}
        >
          <QueryProviders>
            <LazyMotionProvider>{children}</LazyMotionProvider>
          </QueryProviders>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
