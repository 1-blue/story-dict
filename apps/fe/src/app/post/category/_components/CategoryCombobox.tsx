"use client";

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
  FormField,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sd/ui";
import { cn } from "@sd/ui/libs";

import { CATEGORIES } from "#fe/constants";
import { useFormContext } from "react-hook-form";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

interface IProps {
  onSelect: () => void;
}

const CategoryCombobox: React.FC<IProps> = ({ onSelect }) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="category"
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                role="combobox"
                className="w-[200px] justify-between"
              >
                {field.value ? field.value.label : "선택해주세요..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="ex) 카테고리" className="h-9" />
              <CommandList>
                <CommandEmpty>항목을 찾을 수 없습니다.</CommandEmpty>
                <CommandGroup>
                  {CATEGORIES.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => {
                        field.onChange(item);
                        onSelect();
                      }}
                    >
                      {item.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          field.value?.value === item.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    />
  );
};

export default CategoryCombobox;
