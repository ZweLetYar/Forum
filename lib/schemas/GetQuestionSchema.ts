import z from "zod";

const GetQuestionSchma = z.object({
  questionId: z.string(),
});

export default GetQuestionSchma;
