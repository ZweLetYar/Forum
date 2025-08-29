import { Document, model, models, Schema, Types } from "mongoose";

export interface ITagQuestion {
  tag: Types.ObjectId;
  question: Types.ObjectId;
}

export interface ITagQuestionDoc extends ITagQuestion, Document {}

const TagQuestionSchema = new Schema(
  {
    tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate tag-question pairs
TagQuestionSchema.index({ tag: 1, question: 1 }, { unique: true });

const TagQuestion =
  models?.TagQuestion || model<ITagQuestion>("TagQuestion", TagQuestionSchema);

export default TagQuestion;
