import { json } from "@remix-run/node";
import { Link, useLoaderData, Form, useSubmit, useNavigation } from "@remix-run/react";
import PostCard from "../components/PostCard";
import mongoose from "mongoose";
import { useEffect, useState } from "react";

export const meta = () => {
  return [{ title: "Remix Post App" }];
};

export async function loader({ request }) {
  // Get the search query from the URL
  const { searchParams } = new URL(request.url);  // this extracts the url
  const q = searchParams.get("q");
  const likesRange = searchParams.get("likesRange");

  try {
    let posts = [];
    if (q) {
      // Perform a case-insensitive search on the "caption" field
      posts = await mongoose.models.Post.find({ caption: { $regex: new RegExp(q, "i") }});
    } else if (likesRange === "50") {
      posts = await mongoose.models.Post.find({ likes: { $lt: 50 } });
    } else if (likesRange === "50-100") {
      posts = await mongoose.models.Post.find({ likes: { $gte: 50, $lt: 100 } });
    } else if (likesRange === "100-150") {
      posts = await mongoose.models.Post.find({ likes: { $gte: 100, $lt: 150 } });
    } else if (likesRange === null || likesRange === "") {
      posts = await mongoose.models.Post.find();
    }
    else {
      posts = await mongoose.models.Post.find();
    }

    return json({ posts, q, likesRange });
  } catch (error) {
    console.error(error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};

export default function Index() {
  const { posts, q, likesRange } = useLoaderData();
  const submit = useSubmit();

  console.log(likesRange) // State for likesRange

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) { 
      searchField.value = q || "";
    }
  }, [q]);

  useEffect(() => {
    const searchField = document.getElementById("likesRange");
    if (searchField instanceof HTMLInputElement) { 
      searchField.value = likesRange || "";
    }
  }, [likesRange]);

  return (
    <div className="page">
      <h1>Posts</h1>
      <Form
        id="search-form"
        onChange={(event) => {
          submit(event.currentTarget);
        }}
        role="search"
      >
        <input
          id="q"
          aria-label="Search contacts"
          defaultValue={q || ""}
          placeholder="Search"
          type="search"
          name="q"
        />
      </Form>

      <Form
        id="likes-filter-form"
        onChange={(event) => {
          submit(event.currentTarget);
        }}
      >
        <select
          name="likesRange"
          id="likesRange"
        >
          <option value="">All Likes</option>
          <option value="50">less than 50</option>
          <option value="50-100">50-100</option>
          <option value="100-150">100-150</option>
        </select>
      </Form>

      <section className="grid">
        {/* Display filtered posts */}
        {posts.map(post => (
          <Link key={post._id} className="post-link" to={`${post._id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </section>
    </div>
  );
}
