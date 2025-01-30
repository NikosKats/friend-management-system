import { Schema, model, Document } from "mongoose";

export interface INotification extends Document {
  userId: Schema.Types.ObjectId;
  type: "friend_request" | "friend_accepted";
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["friend_request", "friend_accepted"], required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default model<INotification>("Notification", notificationSchema);
