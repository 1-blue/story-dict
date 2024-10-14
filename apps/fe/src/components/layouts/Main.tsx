const Main: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className="flex-1 overflow-y-auto p-4">{children}</main>;
};

export default Main;
