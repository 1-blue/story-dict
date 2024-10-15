import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@xstory/ui";
import Header from "#fe/components/layouts/Header";

interface IProps extends React.ComponentProps<typeof Button> {}

const SheetButton: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button {...props}>{children}</Button>
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
