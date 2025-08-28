import { model, Schema } from "mongoose";

interface Iuser {
  name: string;
  username: string;
  email: string;
  image: string;
  bio?: string;
  location?: string;
  portfolio?: string;
  reputation?: number;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  portfolio: {
    type: String,
  },
  reputation: {
    type: Number,
    default: 0,
  },
});

const User = model<Iuser>("User", UserSchema);

export default User;
