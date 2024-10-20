import Main from "#fe/components/layouts/Main";
import Footer from "#fe/components/layouts/Footer";
import { ThemeToggle } from "@xstory/ui/theme";
import MySidebar from "./Sidebar";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <MySidebar>
        <Main className="flex-1 py-2">{children}</Main>
        <Footer className="flex items-center justify-center gap-3 rounded-md border p-4 text-foreground/50" />
      </MySidebar>

      <ThemeToggle className="fixed bottom-4 right-4 hidden rounded-full lg:inline-flex" />
    </>
  );
};

export default Layout;
