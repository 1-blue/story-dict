import type { Metadata } from "next";

import "@sd/tailwind-config/globals.css";

import { ThemeProvider } from "@sd/ui/theme";
import ShortCutProvider from "#fe/providers/ShortCutProvider";
import { Toaster } from "@sd/ui";
import Layout from "#fe/components/layouts/Layout";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import TanstackQueryProvider from "#fe/providers/TanstackQueryProvider";

export const metadata: Metadata = getSharedMetadata();

interface IProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<IProps> = ({ children }) => {
  return (
    <html lang="ko">
      <head></head>
      <body>
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
