import type { Metadata } from "next";

import "@sd/tailwind-config/globals.css";

import { ThemeProvider } from "@sd/ui/theme";
import ShortCutProvider from "#fe/providers/ShortCutProvider";
import { Toaster } from "@sd/ui";
import Layout from "#fe/components/layouts/Layout";
import { getSharedMetadata } from "#fe/libs/sharedMetadata";
import TanstackQueryProvider from "#fe/providers/TanstackQueryProvider";
import Script from "next/script";

export const metadata: Metadata = getSharedMetadata();

interface IProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<IProps> = ({ children }) => {
  return (
    <html lang="ko">
      <head />
      <body>
        {/* Clarity */}
        {process.env.NODE_ENV === "production" && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`
            (function(c,l,a,r,i,t,y){ 
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ouuf7yr3mk");
          `}
          </Script>
        )}

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
