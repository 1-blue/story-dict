import Link from "next/link";
import { EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { routes } from "#fe/constants";

interface IProps extends React.HTMLAttributes<HTMLElement> {}

const Footer: React.FC<IProps> = (props) => {
  return (
    <footer {...props}>
      <span>© 2024. 1-blue All rights reserved</span>
      <Link href={routes.github.url} target="_blank">
        <GitHubLogoIcon />
      </Link>
      <Link href={routes.email.url}>
        <EnvelopeClosedIcon />
      </Link>
    </footer>
  );
};

export default Footer;
