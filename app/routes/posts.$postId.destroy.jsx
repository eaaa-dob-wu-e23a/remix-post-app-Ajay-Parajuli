import { redirect } from "@remix-run/node";
import mongoose from "mongoose";

export async function action({ params }) {
  await mongoose.models.Post.findByIdAndDelete(params.postId);
  return redirect("/posts");
}
