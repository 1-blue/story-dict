import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@xstory/ui";
import Header from "#fe/components/layouts/Header";
import { DashboardIcon } from "@radix-ui/react-icons";

const HeaderSheet: React.FC = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="default"
            className="fixed bottom-4 right-4 rounded-full lg:hidden"
          >
            <DashboardIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="!max-w-64 p-0" hideClose>
          <SheetHeader>
            <Header />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HeaderSheet;
