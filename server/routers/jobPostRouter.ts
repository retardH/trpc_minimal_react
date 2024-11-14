import z from "zod";
import { publicProcedure, router } from "../trpc";

const createSchema = z.object({
  title: z.string(),
  companyName: z.string(),
  description: z.string(),
  type: z.string(),
});

const updateSchema = createSchema.extend({
  id: z.string(),
});

// Router definition
const jobPostRouter = router({
  // query procedure
  getAllJobPosts: publicProcedure.query(async ({ ctx }) => {
    const allJobPosts = await ctx.prisma.jobPost.findMany();

    return {
      list: allJobPosts,
      message: "Job posts retrieved successfully",
    };
  }),
  // mutation procedure
  createJobPost: publicProcedure
    .input(createSchema)
    .mutation(async ({ ctx, input }) => {
      const createdJobPost = await ctx.prisma.jobPost.create({
        data: input,
      });

      return {
        data: createdJobPost,
        message: "Job post created successfully",
      };
    }),
  updateJobPost: publicProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, ...updatePayload } = input;
      const updatedJobPost = await ctx.prisma.jobPost.update({
        data: updatePayload,
        where: {
          id,
        },
      });

      return {
        data: updatedJobPost,
        message: "Job post updated successfully",
      };
    }),
  deleteJobPost: publicProcedure
    .input((input) => {
      if (typeof input !== "string") {
        throw new Error("Invalid input type");
      }
      return input;
    })
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.jobPost.delete({ where: { id: input } });

      return {
        data: null,
        message: "Job post deleted successfully",
      };
    }),
});

export default jobPostRouter;
