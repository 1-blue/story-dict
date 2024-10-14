import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@xstory/ui";

import Main from "#fe/components/layouts/Main";
import Header from "#fe/components/layouts/Header";
import Footer from "#fe/components/layouts/Footer";
import SheetButton from "./SheetButton";
import { DashboardIcon } from "@radix-ui/react-icons";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ResizablePanelGroup
        direction="vertical"
        className="min-h-[200px] w-screen rounded-lg"
      >
        <ResizablePanel defaultSize={95}>
          <ResizablePanelGroup
            direction="horizontal"
            className="min-h-[200px] w-screen rounded-lg"
          >
            <ResizablePanel defaultSize={85} className="flex">
              <Main>{children}</Main>
            </ResizablePanel>
            <ResizableHandle withHandle className="hidden lg:flex" />
            <ResizablePanel
              defaultSize={15}
              className="hidden min-w-56 lg:flex"
            >
              <Header />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={5} className="flex justify-center">
          <Footer />
        </ResizablePanel>
      </ResizablePanelGroup>

      <SheetButton
        type="button"
        size="icon"
        variant="default"
        className="rounded-full"
      >
        <DashboardIcon className="h-4 w-4" />
      </SheetButton>
    </>
  );
};

export default Layout;
