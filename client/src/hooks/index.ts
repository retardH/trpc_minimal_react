import { ReactQueryOptions, RouterInputs, trpc } from "@/lib/trpc";

type GetJobPostsOptions = ReactQueryOptions["getAllJobPosts"];
type GetJobPostsInput = RouterInputs["getAllJobPosts"];

export const useGetJobPostsQuery = (
  input: GetJobPostsInput,
  options?: GetJobPostsOptions
) => {
  return trpc.getAllJobPosts.useQuery(input, options);
};

type JobPostCreateOptions = ReactQueryOptions["createJobPost"];

export const useCreateJobPostMutation = (options?: JobPostCreateOptions) => {
  return trpc.createJobPost.useMutation(options);
};
