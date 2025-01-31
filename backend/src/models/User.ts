import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  friends: Schema.Types.ObjectId[];
  friendRequests: {
    sent: Schema.Types.ObjectId[]; // References FriendRequest
    received: Schema.Types.ObjectId[]; // References FriendRequest
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed password
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    friendRequests: {
      sent: [{ type: Schema.Types.ObjectId, ref: "FriendRequest" }], // Reference FriendRequest
      received: [{ type: Schema.Types.ObjectId, ref: "FriendRequest" }] // Reference FriendRequest
    }
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
