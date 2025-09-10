import { ThemeToggle } from "#ui/themes";
import { SidebarInset, SidebarProvider } from "#ui/components";
import MySidebar from "#fe/components/layouts/Sidebar/MySidebar";
import Header from "#fe/components/layouts/Header";
import Main from "#fe/components/layouts/Main";

const NoFooterLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <MySidebar />

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Header />
        <SidebarInset className="flex flex-1 flex-col gap-2 rounded-lg p-4">
          <Main className="flex-1 py-2">{children}</Main>
        </SidebarInset>
      </div>

      <ThemeToggle className="fixed bottom-4 right-4 hidden rounded-full lg:inline-flex" />
    </SidebarProvider>
  );
};

export default NoFooterLayout;
