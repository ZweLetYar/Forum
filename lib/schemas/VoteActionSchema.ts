import z from "zod";

const VoteActionSchema = z.object({
  type: z.enum(["question", "answer"]),
  typeId: z.string().min(1),
  voteType: z.enum(["upvote", "downvote"]),
});

export default VoteActionSchema;
