import { useState } from "react";
import JobPostCard from "./components/job-post-card";
import JobPostForm from "./components/job-post-form";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { trpc } from "./lib/trpc";

export default function App() {
  const queryUtils = trpc.useUtils();
  const { mutate } = trpc.createJobPost.useMutation();
  const { data: allJobPostsResp } = trpc.getAllJobPosts.useQuery();
  const allJobPosts = allJobPostsResp?.data ?? [];

  const { data: randomNumber } = trpc.random.useQuery();
  console.log(randomNumber);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleAddJobPost = (payload: {
    title: string;
    companyName: string;
    description: string;
    type: string;
  }) => {
    mutate(payload, {
      onSuccess: () => {
        setIsDialogOpen(false);
        queryUtils.getAllJobPosts.refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl text-center">Jobstr</h2>
      <div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Post</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Post</DialogTitle>
            </DialogHeader>
            <JobPostForm onSubmit={(formData) => handleAddJobPost(formData)} />
          </DialogContent>
        </Dialog>
        {/* <div>
          <JobPostForm />
        </div> */}
        <div className="grid py-4 grid-cols-2 gap-4">
          {allJobPosts.map((post) => (
            <div key={post.id} className="col-span-1">
              <JobPostCard
                title={post.title}
                companyName={post.companyName}
                description={post.description}
                type={post.type}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
