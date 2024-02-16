import mongoose from "mongoose";

// ========== models ========== //
const userSchema = new mongoose.Schema(
  {
    image: String,
    mail: String,
    name: String,
    title: String,
    educations: [String],
    posts: [
      {
        caption: String,
        image: String,
        likes: Number,
        tags: [String]
      },
      { timestamps: true }
    ]
  },
  { timestamps: true }
);



export const models = [
  { name: "User", schema: userSchema, collection: "users" },
];

// ========== initData ========== //

export async function initData() {
  // check if data exists
  const userCount = await mongoose.models.User.countDocuments();

  if (userCount === 0) {
    await insertData();
  }
}

// ========== insertData ========== //

async function insertData() {
  const User = mongoose.models.User;

  console.log("Dropping collections...");
  await User.collection.drop();

  console.log("Inserting data...");
  // Insert users
   await User.create({
    image:
      "https://www.baaa.dk/media/b5ahrlra/maria-louise-bendixen.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921650330000&format=webp",
    mail: "mlbe@eaaa.dk",
    name: "Maria Louise Bendixen",
    title: "Senior Lecturer",
    educations: ["Multimedia Design"],
    posts: [  {
      caption: "Beautiful sunset at the beach",
      image:
        "https://images.unsplash.com/photo-1566241832378-917a0f30db2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      likes: 101,
      tags: ["beach", "sunset", "nature", "Aarhus"]
    },
    {
      caption: "A beautiful morning in Aarhus",
      image:
        "https://images.unsplash.com/photo-1573997953524-efed43db70a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      likes: 99,
      tags: ["morning", "Aarhus", "beautiful", "AROS"]
    },
  
  ]
  });

   await User.create({
    _id: new mongoose.Types.ObjectId("65cde4cb0d09cb615a23db17"),
    image: "https://share.cederdorff.dk/images/race.webp",
    mail: "race@eaaa.dk",
    name: "Rasmus Cederdorff",
    title: "Senior Lecturer",
    educations: ["Multimedia Design", "Web Development", "Digital Concept Development"],
    posts: [
      {
        caption: "Exploring the city streets of Aarhus",
        image:
          "https://images.unsplash.com/photo-1559070169-a3077159ee16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        likes: 33,
        tags: ["city", "Aarhus", "exploration"]
      },
      {
        caption: "Exploring the city center of Aarhus",
        image:
          "https://images.unsplash.com/photo-1612624629424-ddde915d3dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        likes: 97,
        tags: ["city", "Aarhus", "exploration", "cityhall"]
      },
    ]
  });

 await User.create({
    image:
      "https://www.baaa.dk/media/5buh1xeo/anne-kirketerp.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921531600000&format=webp",
    mail: "anki@eaaa.dk",
    name: "Anne Kirketerp",
    title: "Head of Department",
    educations: ["Multimedia Design", "Web Development", "Digital Concept Development"],
    posts: [
      {
        caption: "Rainbow reflections of the city of Aarhus",
        image:
          "https://images.unsplash.com/photo-1558443336-dbb3de50b8b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        likes: 589,
        tags: ["city", "Aarhus", "rainbow", "AROS"]
      },
    ]
  });

await User.create({
    image: "https://www.eaaa.dk/media/14qpfeq4/line-skjodt.jpg?width=800&height=450&rnd=133178433559770000",
    mail: "lskj@eaaa.dk",
    name: "Line Skjødt",
    title: "Senior Lecturer & Internship Coordinator",
    educations: ["Multimedia Design"],
    posts: [
      {
        caption: "Delicious food at the restaurant",
        image:
          "https://images.unsplash.com/photo-1548940740-204726a19be3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        likes: 21,
        tags: ["food", "restaurant", "delicious"]
      },
    ]
  });

  await User.create({
    image:
      "https://www.eaaa.dk/media/bdojel41/dan-okkels-brendstrup.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921559630000&format=webp",
    mail: "dob@eaaa.dk",
    name: "Dan Okkels Brendstrup",
    title: "Lecturer",
    educations: ["Web Development"],
    posts: [
      {
        caption: "A cozy morning with coffee",
        image:
          "https://images.unsplash.com/photo-1545319261-f3760f9dd64d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        likes: 785,
        tags: ["morning", "coffee", "cozy", "food"]
      },
    ]
  });
}
