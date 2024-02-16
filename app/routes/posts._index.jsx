import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import PostCard from "../components/PostCard";
import db from "../db/db-connect.server";

export const meta = () => {
  return [{ title: "Remix Post App" }];
};

export async function loader() {
  const posts = await db
    .collection("posts")
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          caption: 1,
          createdAt: 1,
          image: 1,
          user: 1
        }
      }
    ])
    .sort({ createdAt: -1 })
    .toArray();

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
