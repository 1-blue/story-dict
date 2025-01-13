import type { Metadata } from "next";

import "@sd/tailwind-config/globals.css";

import { Toaster } from "@sd/ui";
import { ThemeProvider } from "@sd/ui/theme";

import ClarityProvider from "#fe/providers/ClarityProvider";
import ShortCutProvider from "#fe/providers/ShortCutProvider";
import TanstackQueryProvider from "#fe/providers/TanstackQueryProvider";
import Layout from "#fe/components/layouts/Layout";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";

export const metadata: Metadata = getSharedMetadata();

interface IProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<IProps> = ({ children }) => {
  return (
    <html lang="ko">
      <head>
        {/* 네이버 웹마스터 도구 */}
        <meta
          name="naver-site-verification"
          content="f8c5c771f15fed3ca3b5db376b1c066f6bfef6c8"
        />
      </head>
      <body>
        <ClarityProvider />

        <TanstackQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ShortCutProvider />
            <Toaster closeButton />

            <Layout>{children}</Layout>
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
