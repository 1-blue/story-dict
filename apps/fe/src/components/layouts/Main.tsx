interface IProps extends React.HTMLAttributes<HTMLElement> {}

const Main: React.FC<React.PropsWithChildren<IProps>> = ({
  children,
  ...props
}) => {
  return <main {...props}>{children}</main>;
};

export default Main;
