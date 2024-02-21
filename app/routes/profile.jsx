import { Form, Link, useLoaderData } from "@remix-run/react";
import { authenticator } from "../services/auth.server";

export async function loader({ request }) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/signin"
  });
  return user;
}

export default function Profile() {
  const user = useLoaderData();
  return (
    <div className="page">
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Title: {user.title}</p>
      <p>Mail: {user.mail}</p>
      <p>Educations: {user.educations}</p>
    <img src={user.image} alt={user.name} />

      <Form method="post">
        <button>Logout</button>
        <Link to="/update-profile">Update Profile</Link>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  await authenticator.logout(request, { redirectTo: "/signin" });
}