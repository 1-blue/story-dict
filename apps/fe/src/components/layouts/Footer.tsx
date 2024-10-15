import Link from "next/link";
import { EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

interface IProps extends React.HTMLAttributes<HTMLElement> {}

const Footer: React.FC<IProps> = (props) => {
  return (
    <footer {...props}>
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
