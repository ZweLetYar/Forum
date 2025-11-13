import { Document, model, models, Schema, Types } from "mongoose";

export interface ICollection {
  author: Types.ObjectId; // User who collected
  question: Types.ObjectId; // Question being collected
}

export interface ICollectionDoc extends ICollection, Document {}

const CollectionSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

// Prevent duplicate collections (same user saving the same question multiple times)
CollectionSchema.index({ author: 1, question: 1 }, { unique: true });

const Collection =
  models?.Collection || model<ICollection>("Collection", CollectionSchema);

export default Collection;
