import Main from "#fe/components/layouts/Main";
import Header from "#fe/components/layouts/Header";
import Footer from "#fe/components/layouts/Footer";
import SheetButton from "./SheetButton";
import { DashboardIcon } from "@radix-ui/react-icons";
import { ThemeToggle } from "@xstory/ui/theme";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <section className="flex flex-col gap-3 pb-4">
        <article className="flex gap-3">
          <Main className="flex-1 overflow-y-auto rounded-md border p-4">
            {children}
          </Main>
          <Header className="sticky right-0 top-4 hidden h-fit min-w-56 flex-col divide-y-2 rounded-md border lg:flex" />
        </article>

        <Footer className="flex items-center justify-center gap-3 rounded-md border p-4 text-foreground/50" />
      </section>

      <SheetButton
        type="button"
        size="icon"
        variant="default"
        className="fixed bottom-4 right-4 rounded-full lg:hidden"
      >
        <DashboardIcon className="h-4 w-4" />
      </SheetButton>
      <ThemeToggle className="fixed bottom-4 right-4 hidden rounded-full lg:inline-flex" />
    </>
  );
};

export default Layout;
