import { ThemeToggle } from "#ui/themes";
import { SidebarInset, SidebarProvider } from "#ui/components";
import MySidebar from "#fe/components/layouts/Sidebar/MySidebar";
import Header from "#fe/components/layouts/Header";
import Main from "#fe/components/layouts/Main";
import Footer from "#fe/components/layouts/Footer";

const AllLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <MySidebar />

      <div className="flex flex-1 flex-col gap-2 md:p-4">
        <Header />
        <SidebarInset className="flex flex-1 flex-col gap-2 rounded-lg p-2 md:p-4">
          <Main className="flex-1 py-0 md:py-2">{children}</Main>
          <Footer className="flex items-center justify-center gap-3 rounded-md border p-4 text-foreground/50" />
        </SidebarInset>
      </div>

      <ThemeToggle className="fixed bottom-4 right-4 hidden rounded-full lg:inline-flex" />
    </SidebarProvider>
  );
};

export default AllLayout;
