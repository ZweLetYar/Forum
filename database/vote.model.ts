import { Document, model, models, Schema, Types } from "mongoose";

export interface IVote {
  author: Types.ObjectId; // User who voted
  type_id: Types.ObjectId; // Target (Question or Answer)
  type: "question" | "answer";
  voteType: "upvote" | "downvote";
}

export interface IVoteDoc extends IVote, Document {}

const VoteSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    type: {
      type: String,
      enum: ["question", "answer"],
      required: true,
    },
    voteType: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate votes from the same user on the same target
VoteSchema.index({ author: 1, type_id: 1, type: 1 }, { unique: true });

const Vote = models?.Vote || model<IVote>("Vote", VoteSchema);

export default Vote;
