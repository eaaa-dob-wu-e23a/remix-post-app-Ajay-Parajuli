import { json } from "@remix-run/node";
import { Link, useLoaderData, Form, useSubmit, useNavigation } from "@remix-run/react";
import PostCard from "../components/PostCard";
import mongoose from "mongoose";
import { useEffect } from "react";

export const meta = () => {
  return [{ title: "Remix Post App" }];
};

export async function loader({ request }) {
  // Get the search query from the URL
  const { searchParams } = new URL(request.url); 
  const q = searchParams.get("q");

  try {
    let posts = [];
    if (q) {
      // Perform a case-insensitive search on the "caption" field
      posts = await mongoose.models.Post.find({ caption: { $regex: new RegExp(q, "i") }});
    } else {
      posts = await mongoose.models.Post.find();
    }

    return json({ posts, q });
  } catch (error) {
    console.error(error);
    throw new Response("Internal Server Error", { status: 500 });
  }
};



export default function Index() {
  const { posts, q } = useLoaderData();
  const submit = useSubmit();
 
 

  
  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);


  return (
    <div className="page">
      <h1>Posts</h1>
      <Form id="search-form" onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
              role="search">
              <input
                id="q"
                aria-label="Search contacts"
                defaultValue={q || ""}
                placeholder="Search"
                type="search"
                name="q"
              />
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
