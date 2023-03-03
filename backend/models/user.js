import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "blog", required: true }],
});

let User = mongoose.model("User", userSchema);

export default User;
