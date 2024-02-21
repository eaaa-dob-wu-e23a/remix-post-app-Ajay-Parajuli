import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, Link } from "@remix-run/react";
import { useState } from "react";
import mongoose from "mongoose";
import { authenticator } from "../services/auth.server";
import { useNavigate } from "@remix-run/react";

export async function loader({ request }) {
  const user = await authenticator.isAuthenticated(request, {
    // Check if the user is authenticated and get the user data
    failureRedirect: "/signin"
  });
  return { user };
}

export async function action({ request }) {
    const formData = await request.formData();
    const newData = Object.fromEntries(formData);
  
    try {
      const user = await authenticator.isAuthenticated(request, {
        failureRedirect: "/signin"
      });
  
      // Update user profile
      await mongoose.models.User.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            name: newData.name,
            title: newData.title,
            image: newData.image,
            educations: newData.educations,
          }
        }
      );
  
      // Redirect the user to the updated profile page
      return redirect(`/profile`);
    } catch (error) {
      // Handle authentication error
      return redirect("/signin");
    }
  }
  

export default function UpdateProfile() {
  const { user } = useLoaderData();
  const [image, setImage] = useState(user.image);

  const navigate = useNavigate(); // Define useNavigate hook

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div className="page">
      <div id="" className="update-profile">
        <h3 className="">Update Profile</h3>
        <div className="">
          <div className="">
            <div className=""></div>
          </div>
          <Form id="sign-in-form" method="post" className="">
            <label htmlFor="name">Name</label>
            <div className="">
              <input
                className=""
                type="text"
                id="name"
                defaultValue={user.name}
                name="name"
                required
              />
            </div>

            <label htmlFor="name">Title</label>
            <div className="">
              <input
                className=""
                type="text"
                id="title"
                defaultValue={user.title}
                name="title"
                required
              />
            </div>

            <label htmlFor="name">Educations</label>
            <div className="">
              <input
                className=""
                type="text"
                id="title"
                defaultValue={user.educations}
                name="educations"
                required
              />
            </div>
            
            <div className="">
              <label htmlFor="image">Image URL</label>

              <input
                name="image"
                className=""
                defaultValue={user.image}
                type="url"
                onChange={e => setImage(e.target.value)}
                placeholder="Paste an image URL..."
              />
                <div className="img-prev">
              <label className="" htmlFor="image-preview">Image Preview</label>
              <img
                id="image-preview"
                className="object-cover"
                src={image ? image : "https://placehold.co/600x400?text=Paste+an+image+URL"}
                alt="Choose"
                onError={e => (e.target.src = "https://placehold.co/600x400?text=Error+loading+image")}
              />
              </div>
            </div>
            <div className="btn-update">
              <button className="">Update</button> <br></br>
              <button className="" onClick={handleCancel}>Cancel</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
