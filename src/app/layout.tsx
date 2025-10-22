import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { ZyloProvider } from "@/lib/zylo/provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "🌱 AI Food & Nutrition Waste Reducer",
  description: "Enter your meals to see nutrition info, estimated food waste, and healthy alternatives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

      
        {/* PHOENIX_EDITOR_INJECTION_START */}
        {(process.env.NODE_ENV === 'development' ||
          process.env.NEXT_PUBLIC_ENABLE_PHOENIX_EDITOR === 'true') && (
          <>
            <link rel="stylesheet" href="/phoenix-editor/helper.css?v=1761134522530" />
            <script
              src="/phoenix-editor/sourceMapTracker.js?v=1761134522530"
              data-phoenix-sourcemap="true"
              defer
            />
            <script
              src="/phoenix-editor/helper.js?v=1761134522530"
              data-phoenix-enabled="true"
              defer
            />
            <script
              src="/phoenix-editor/visualEditExtension.js?v=1761134522530"
              data-phoenix-visual-edit="true"
              defer
            />
            <script
              src="/phoenix-editor/contextIntegration.js?v=1761134522530"
              data-phoenix-context="true"
              defer
            />
            <script
              src="/phoenix-editor/inlineTextEditor.js?v=1761134522530"
              data-phoenix-text-edit="true"
              defer
            />
          </>
        )}
        {/* PHOENIX_EDITOR_INJECTION_END */}
      </head>
      <body
        className={`${inter.variable} antialiased`}
      >
        <QueryProvider>
          <ZyloProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                {children}
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </ThemeProvider>
          </ZyloProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
