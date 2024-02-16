import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import mongoose from "mongoose";

export const meta = () => {
  return [{ title: "Remix Post App" }];
};

export async function loader() {
  const posts = await mongoose.models.User.find().sort({ createdAt: -1 }) // populate the posts 

  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData();
  console.log(posts);
  return (
    <div className="page">
      <h1>Posts</h1>
      <section className="grid">
        {posts.map((post, index) => (
          <div key={index} className="post-card">
            {post.posts.map((postItem, postIndex) => (
              <div key={postIndex}>
                <img src={postItem.image} />
                <p>{postItem.likes}</p>
                <p>{postItem.caption}</p>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
