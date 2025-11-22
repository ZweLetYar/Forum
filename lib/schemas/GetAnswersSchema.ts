import z from "zod";

const GetAnswersSchema = z.object({
  questionId: z.string(),
  page: z.number().min(1).optional().default(1),
  pageSize: z.number().min(1).max(100).optional().default(10),
  filter: z.string().optional(),
});
export default GetAnswersSchema;
