import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
         <div className="user-card">
            <img src={user.image}></img>
            <h3>{user.name}</h3>
            <p>{user.mail}</p>
            <p>{user.title}</p>
         </div>
        ))}
      </section>
    </div>
  );
}
