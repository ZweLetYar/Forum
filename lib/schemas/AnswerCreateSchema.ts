import z from "zod";

const AnswerCreateSchema = z.object({
  questionId: z.string(),
  answerContent: z.string().min(1, "Answer is required."),
});

export default AnswerCreateSchema;
