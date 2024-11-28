"use client";

import {
  ChevronUpDownIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  toast,
} from "@sd/ui";

import useMe from "#fe/hooks/queries/users/useMe";
import { handleError } from "#fe/libs/handleError";

const SidebarBottom: React.FC = () => {
  const { me, logOutMutateAsync } = useMe();

  const onLogOut = async () => {
    try {
      await logOutMutateAsync({});
      toast.success("로그아웃 되었습니다..🥲", {
        description: "다음에 또 이용해주세요!",
      });
    } catch (error) {
      handleError({ error });
    }
  };

  if (!me) return null;

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage src={me.image?.url} alt={me.nickname} />
                  <AvatarFallback className="rounded-lg">
                    {me.nickname.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{me.nickname}</span>
                  <span className="truncate text-xs">{me.email}</span>
                </div>
                <ChevronUpDownIcon className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage src={me.image?.url} alt={me.nickname} />
                    <AvatarFallback className="rounded-lg">
                      {me.nickname.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {me.nickname}
                    </span>
                    <span className="truncate text-xs">{me.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogOut}
                  className="flex-1 cursor-pointer items-center justify-start gap-1 px-1.5"
                >
                  <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                  <span>로그아웃</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default SidebarBottom;
