import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import PostCard from "../components/PostCard";
import db, { ObjectId } from "../db/db-connect.server";

export function meta({ data }) {
  return [
    {
      title: `Remix Post App - ${data.post.caption || "Post"}`
    }
  ];
}

export async function loader({ params }) {
  const post = await db.collection("posts").findOne({ _id: new ObjectId(params.postId) });
  const user = await db.collection("users").findOne({ _id: post.uid });
  post.user = user;
  return json({ post });
}

export default function Post() {
  const { post } = useLoaderData();

  function confirmDelete(event) {
    const response = confirm("Please confirm you want to delete this post.");
    if (!response) {
      event.preventDefault();
    }
  }

  return (
    <div id="post-page" className="page">
      <h1>{post.caption}</h1>
      <PostCard post={post} />
      <div className="btns">
        <Form action="update">
          <button>Update</button>
        </Form>
        <Form action="destroy" method="post" onSubmit={confirmDelete}>
          <button>Delete</button>
        </Form>
      </div>
    </div>
  );
}
