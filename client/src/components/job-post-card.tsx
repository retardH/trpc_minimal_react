type Props = {
  title: string;
  companyName: string;
  description: string;
  type: string;
};
const JobPostCard = ({ title, companyName, description, type }: Props) => {
  return (
    <div className="border px-2 py-3 rounded-md flex flex-col gap-2">
      <div className="flex items-center">
        <h4 className="text-lg">{title}</h4>
        {", "}
        <p className="text-sm ml-1">{type}</p>
      </div>
      <p className="text-sm">{description}</p>
      <div className="flex w-full items-center justify-between">
        <p className="text-sm">By {companyName}</p>
        <p className="text-sm">{new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default JobPostCard;
