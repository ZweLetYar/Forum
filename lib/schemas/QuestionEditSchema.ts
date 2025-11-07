import z from "zod";

const QuestionEditSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
});

export default QuestionEditSchema;
