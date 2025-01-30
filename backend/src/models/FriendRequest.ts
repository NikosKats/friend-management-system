import { Schema, model, Document } from "mongoose";

export interface IFriendRequest extends Document {
  senderId: Schema.Types.ObjectId;
  receiverId: Schema.Types.ObjectId;
  status: "pending" | "accepted" | "declined";
  createdAt: Date;
  updatedAt: Date;
}

const friendRequestSchema = new Schema<IFriendRequest>(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" }
  },
  { timestamps: true }
);

export default model<IFriendRequest>("FriendRequest", friendRequestSchema);
