import { json } from "@remix-run/node";
import { Link, useLoaderData, Form, useSubmit, useNavigation } from "@remix-run/react";
import PostCard from "../components/PostCard";
import mongoose from "mongoose";
import { useEffect, useState } from "react";

export const meta = () => {
  return [{ title: "Remix Post App" }];
};

export async function loader({ request }) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  const likesRange = searchParams.get("likesRange"); // this adds the likesRange to the searchParams
  const tags = searchParams.get("tags");

  try {
    let filterCriteria = {};

    if (q) {
      filterCriteria.caption = { $regex: new RegExp(q, "i") };
    }

    if (likesRange) {
      if (likesRange === "50") {
        filterCriteria.likes = { $lt: 50 };
      } else if (likesRange === "50-100") {
        filterCriteria.likes = { $gte: 50, $lt: 100 };
      } else if (likesRange === "100-150") {
        filterCriteria.likes = { $gte: 100, $lt: 150 };
      } else if (likesRange === "150-200") {
        filterCriteria.likes = { $gte: 150, $lt: 200};
      } else if (likesRange === "200") {
        filterCriteria.likes = { $gte: 200};
      }
    }

    if (tags) {
      filterCriteria.tags = { $regex: new RegExp(tags, "i") };
    }

    const posts = await mongoose.models.Post.find(filterCriteria).populate("user").sort({ createdAt: -1 });


    return json({ posts, q, likesRange, tags });
  } catch (error) {
    console.error(error);
    throw new Response("Internal Server Error", { status: 500 });
  }
}



export default function Index() {
  const { posts, q, likesRange, tags } = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    const searchFieldQ = document.getElementById("q");
    const searchFieldLikes = document.querySelector(".filter");
    const searchFieldTags = document.querySelector(".filtertags");

    if (searchFieldQ instanceof HTMLInputElement) { 
        searchFieldQ.value = q || "";
    }

    if (searchFieldLikes instanceof HTMLInputElement) { 
        searchFieldLikes.value = likesRange || "";
    }

    if (searchFieldTags instanceof HTMLInputElement) { 
        searchFieldTags.value = tags || "";
    }
}, [q, likesRange, tags]);


  return (
    <>
    <div >
    </div>
    <div className="page ">
    <h1>Posts</h1>
    <div className="flex-dem">
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
          placeholder="Search caption..."
          type="search"
          name="q"
        />
      </Form>

      <Form
  id="filter-form"
  onChange={(event) => {
    submit(event.currentTarget);
  }}
>
  <label htmlFor="likesRange">Filter by Likes:</label>
  <select name="likesRange" className="filter">
    <option value="">All Likes</option>
    <option value="50">less than 50</option>
    <option value="50-100">50-100</option>
    <option value="100-150">100-150</option>
    <option value="150-200">150-200</option>
    <option value="200">more than 200</option>
  </select>
        <label htmlFor="tags">Filter by Tags:</label>
        <button name="tags" className="filtertags" value="Aarhus">Aarhus</button>
        <button name="tags" className="filtertags" value="Food">Food</button>

      


</Form>
    </div>
      <section className="grid">
        {/* Display filtered posts */}
        {posts.map(post => (
          <Link key={post._id} className="post-link" to={`${post._id}`}>
            <PostCard post={post} />
          </Link>
        ))}
      </section>
    </div>
    </>
  );
}
