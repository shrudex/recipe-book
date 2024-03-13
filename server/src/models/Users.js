import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

export const User = mongoose.model("User", userSchema);
