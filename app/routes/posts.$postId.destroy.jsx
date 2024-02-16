import { redirect } from "@remix-run/node";
import db, { ObjectId } from "../db/db-connect.server";

export async function action({ params }) {
  const result = await db.collection("posts").deleteOne({ _id: new ObjectId(params.postId) });

  if (result.acknowledged) {
    return redirect("/posts");
  }
}
