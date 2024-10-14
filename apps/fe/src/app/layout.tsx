import type { Metadata } from "next";

import "@xstory/tailwind-config/globals.css";

import { ThemeProvider } from "@xstory/ui/theme";
import TRPCProvider from "#fe/providers/TRPCProvider";
import ShortCutProvider from "#fe/providers/ShortCutProvider";
import { Toaster } from "@xstory/ui";
import Layout from "#fe/components/layouts/Layout";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";

export const metadata: Metadata = getSharedMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head></head>
      <body className="m-4 flex h-[calc(100vh-32px)] flex-col rounded-lg border">
        <TRPCProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ShortCutProvider />
            <Toaster />

            <Layout>{children}</Layout>
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
