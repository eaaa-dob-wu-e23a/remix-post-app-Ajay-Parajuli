import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import PostCard from "../components/PostCard";
import mongoose from "mongoose";

export const meta = () => {
  return [{ title: "Remix Post App" }];
};

export async function loader() {
  const posts = await mongoose.models.Post.find().sort({ createdAt: -1 }).populate("user").exec();

  return json({ posts });
}

export default function Index() {
  const { posts } = useLoaderData();
  return (
    <div className="page">
      <h1>Posts</h1>
      <section className="grid">
        {posts.map(post => (
          <Link key={post._id} className="post-link" to={`${post._id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </section>
    </div>
  );
}
