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
import { RouterInputs, trpc } from "./lib/trpc";

export default function JobPostsPage() {
  const queryUtils = trpc.useUtils();

  // mutations
  const createJobPost = trpc.createJobPost.useMutation();
  const deleteJobPostMutation = trpc.deleteJobPost.useMutation();

  // query all job posts
  const allJobPostsResult = trpc.getAllJobPosts.useQuery();

  const handleAddJobPost = (payload: RouterInputs["createJobPost"]) => {
    createJobPost.mutate(payload, {
      onSuccess: () => {
        setIsDialogOpen(false);
        queryUtils.getAllJobPosts.refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const handleDeleteJobPost = (id: string) => {
    deleteJobPostMutation.mutate(id, {
      onSuccess: () => {
        queryUtils.getAllJobPosts.refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl text-center">JobList</h2>
      <div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Post</Button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Add New Post</DialogTitle>
            </DialogHeader>
            <JobPostForm onSubmit={(formData) => handleAddJobPost(formData)} />
          </DialogContent>
        </Dialog>
        <div className="grid py-8 grid-cols-2 gap-4">
          {allJobPostsResult.data?.list.map((post) => (
            <div key={post.id} className="col-span-1">
              <JobPostCard
                title={post.title}
                companyName={post.companyName}
                description={post.description}
                type={post.type}
                onDeleteBtnClick={() => handleDeleteJobPost(post.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
