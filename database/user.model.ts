import { model, Schema } from "mongoose";

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

const User = model("User", UserSchema);

export default User;
