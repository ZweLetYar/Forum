import z from "zod";

const GetTagQuestionSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  pageSize: z.number().int().positive().max(100).optional().default(10),
  search: z.string().trim().max(100).optional(),
  sort: z.string().trim().optional(),
  tagId: z.string(),
});

export default GetTagQuestionSchema;
