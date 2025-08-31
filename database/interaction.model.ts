import { Document, model, models, Schema, Types } from "mongoose";

export interface IInteraction {
  user: Types.ObjectId; // The user performing the action
  action: string; // e.g., "view", "bookmark", "share"
  actionId: Types.ObjectId; // Target (Question or Answer)
  actionType: "question" | "answer"; // What type the target is
}

export interface IInteractionDoc extends IInteraction, Document {}

const InteractionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    actionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    actionType: {
      type: String,
      enum: ["question", "answer"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Prevent duplicate identical interactions
InteractionSchema.index(
  { user: 1, action: 1, actionId: 1, actionType: 1 },
  { unique: true }
);

const Interaction =
  models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;
