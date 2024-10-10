import Link from "next/link";
import { EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-center gap-3 p-4 text-foreground/50">
      <span>© 2024. 1-blue All rights reserved</span>
      <Link href="https://github.com/1-blue" target="_blank">
        <GitHubLogoIcon />
      </Link>
      <Link href="mailto:ghksaud678@gmail.com">
        <EnvelopeClosedIcon />
      </Link>
    </footer>
  );
};

export default Footer;
