import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { useState } from "react";
import db, { ObjectId } from "../db/db-connect.server";

export function meta() {
  return [
    {
      title: "Remix Post App - Update"
    }
  ];
}

export async function loader({ params }) {
  const post = await db.collection("posts").findOne({ _id: new ObjectId(params.postId) });
  const user = await db.collection("users").findOne({ _id: post.uid });
  post.user = user;
  return json({ post });
}

export default function UpdatePost() {
  const { post } = useLoaderData();
  const [image, setImage] = useState(post.image);
  const navigate = useNavigate();

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div className="page">
      <h1>Update Post</h1>
      <Form id="post-form" method="post">
        <label htmlFor="caption">Caption</label>
        <input
          id="caption"
          defaultValue={post.caption}
          name="caption"
          type="text"
          aria-label="caption"
          placeholder="Write a caption..."
        />
        <label htmlFor="image">Image URL</label>
        <input
          name="image"
          defaultValue={post.image}
          type="url"
          onChange={e => setImage(e.target.value)}
          placeholder="Paste an image URL..."
        />

        <label htmlFor="image-preview">Image Preview</label>
        <img
          id="image-preview"
          className="image-preview"
          src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
          alt="Choose"
          onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
        />

        <input name="uid" type="text" defaultValue={post.uid} hidden />
        <div className="btns">
          <button>Save</button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const post = Object.fromEntries(formData);

  const result = await db.collection("posts").updateOne(
    { _id: new ObjectId(params.postId) },
    {
      $set: {
        caption: post.caption,
        image: post.image
      }
    }
  );

  if (result.acknowledged && result.modifiedCount === 1) {
    return redirect(`/posts/${params.postId}`);
  }
}
