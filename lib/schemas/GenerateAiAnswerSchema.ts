import z from "zod";

const GenerateAiAnswerSchema = z.object({
  title: z.string().min(5).max(150),
  content: z.string().min(10).max(5000),
  userAnswer: z.string().min(10).max(5000),
});
export default GenerateAiAnswerSchema;
