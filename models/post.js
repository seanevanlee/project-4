import mongoose from "mongoose";

const likesSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId },
});

// Comments/Likes don't exist standalone. Without being tied to a hero, they're meaningless!

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // referencing a model
  photoUrl: String,
  caption: String,
  likes: [likesSchema],
});

export default mongoose.model("Post", postSchema);
