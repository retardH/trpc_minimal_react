import { trpc } from "@/lib/trpc";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";

type FormData = {
  title: string;
  companyName: string;
  description: string;
  type: string;
};
type Props = {
  onSubmit: (payload: FormData) => void;
  data?: FormData;
};
const JobPostForm = ({ onSubmit }: Props) => {
  const { data: jobTypesResp } = trpc.getJobTypes.useQuery();
  const jobTypesList = jobTypesResp?.data ?? [];

  const [formData, setFormData] = useState<FormData>({
    title: "",
    companyName: "",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, nesciunt. Lorem ipsum dolor sit amet.",
    type: "",
  });

  const handleFormDataChange = <V,>(key: keyof typeof formData, value: V) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <Input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => handleFormDataChange("title", e.target.value)}
      />
      <Input
        type="text"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={(e) => handleFormDataChange("companyName", e.target.value)}
      />
      <Textarea
        rows={4}
        placeholder="Description"
        value={formData.description}
        onChange={(e) => handleFormDataChange("description", e.target.value)}
      />
      <Select
        value={formData.type}
        onValueChange={(value) => handleFormDataChange("type", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Job Type" />
        </SelectTrigger>
        <SelectContent>
          {jobTypesList.map((type) => {
            return (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type="submit" className="mt-2">
        Add New
      </Button>
    </form>
  );
};

export default JobPostForm;
