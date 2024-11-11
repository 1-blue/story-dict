interface IProps {
  title: string;
  description: string;
}

const EmptyAlert: React.FC<IProps> = ({ title, description }) => {
  return (
    <article className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed px-8 py-4">
      <h6 className="text-lg font-bold">{title}</h6>
      <p>{description}</p>
    </article>
  );
};

export default EmptyAlert;
