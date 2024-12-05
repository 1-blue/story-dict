import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@sd/ui";
import { cn } from "@sd/ui/libs";

import type { IRoute } from "#fe/types";

interface IProps {
  routes: IRoute[];
}

const SidebarInfoGroup: React.FC<IProps> = ({ routes }) => {
  const pathname = usePathname();

  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupContent>
        <SidebarMenu>
          {routes
            .filter((route) => !route.hidden)
            .map((route) => (
              <SidebarMenuItem key={route.label}>
                <SidebarMenuButton asChild size="sm">
                  <Link
                    target="_blank"
                    href={route.url}
                    className={cn(
                      "transition-colors hover:bg-muted-foreground/20",
                      pathname.includes(route.url) && "!text-primary",
                    )}
                  >
                    <route.OIcon />
                    <span>{route.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarInfoGroup;
