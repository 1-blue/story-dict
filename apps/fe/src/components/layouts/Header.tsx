import Link from "next/link";

import { Input } from "@xstory/ui";
import { AUTH_ROUTES, CONTENT_ROUTES } from "#fe/constants";

const Header = () => {
  return (
    <header className="border-r">
      <section className="border-b p-4">
        <Input placeholder="ex) ..." />
      </section>
      <ul className="border-b p-1.5">
        {CONTENT_ROUTES.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="flex items-center gap-2 rounded-md px-3 py-2.5 transition-colors hover:bg-foreground/10"
          >
            <route.Icon className="h-5 w-5" />
            <span className="text-sm">{route.label}</span>
          </Link>
        ))}
      </ul>
      <ul className="border-b p-1">
        {AUTH_ROUTES.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="flex items-center gap-2 rounded-md px-3 py-2.5 transition-colors hover:bg-foreground/10"
          >
            <route.Icon className="h-5 w-5" />
            <span className="text-sm">{route.label}</span>
          </Link>
        ))}
      </ul>
    </header>
  );
};

export default Header;
