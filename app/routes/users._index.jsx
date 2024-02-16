import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import UserAvatar from "../components/UserAvatar";
import mongoose from "mongoose";

export const meta = () => {
  return [{ title: "Remix Post App" }];
};

export async function loader() {
  const users = await mongoose.models.User.find().sort({ createdAt: -1 }); // populate is for 

  return json({ users });
}

export default function User() {
  const { users } = useLoaderData();
  return (
    <div className="page">
      <h1>Users</h1>
      <section className="grid">
        {users.map(user => (
          <Link key={user._id} className="post-link" to={`${user._id}`}>
           <UserAvatar user={user} />
          </Link>
        ))}
      </section>
    </div>
  );
}
