import { cn } from "@xstory/ui/libs";
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@xstory/ui";
import Header from "./Header";
interface IProps extends React.ComponentProps<typeof Button> {}

const SheetButton: React.FC<IProps> = ({ className, children, ...props }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className={cn("fixed right-10 top-6 lg:hidden", className)}
            {...props}
          >
            {children}
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

export default SheetButton;
