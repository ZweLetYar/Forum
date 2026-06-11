import z from "zod";

const IncreaseViewCountSchema = z.object({
  questionId: z.string(),
});

export default IncreaseViewCountSchema;
