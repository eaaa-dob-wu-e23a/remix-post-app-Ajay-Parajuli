use("remix_post_app");

// reset database collections
db.getCollection("users").drop();
db.getCollection("posts").drop();

// insert users
const maria = db.getCollection("users").insertOne({
  image:
    "https://www.baaa.dk/media/b5ahrlra/maria-louise-bendixen.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921650330000&format=webp",
  mail: "mlbe@eaaa.dk",
  name: "Maria Louise Bendixen",
  title: "Senior Lecturer"
});

const rasmus = db.getCollection("users").insertOne({
  image: "https://share.cederdorff.dk/images/race.webp",
  mail: "race@eaaa.dk",
  name: "Rasmus Cederdorff",
  title: "Senior Lecturer"
});

const anne = db.getCollection("users").insertOne({
  image:
    "https://www.baaa.dk/media/5buh1xeo/anne-kirketerp.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921531600000&format=webp",
  mail: "anki@eaaa.dk",
  name: "Anne Kirketerp",
  title: "Head of Department"
});

const line = db.getCollection("users").insertOne({
  image: "https://www.eaaa.dk/media/14qpfeq4/line-skjodt.jpg?width=800&height=450&rnd=133178433559770000",
  mail: "lskj@eaaa.dk",
  name: "Line Skjødt",
  title: "Senior Lecturer & Internship Coordinator"
});

const dan = db.getCollection("users").insertOne({
  _id: ObjectId("65cca4b2c4d261037ec49a23"),
  image:
    "https://www.eaaa.dk/media/bdojel41/dan-okkels-brendstrup.jpg?anchor=center&mode=crop&width=800&height=450&rnd=132792921559630000&format=webp",
  mail: "dob@eaaa.dk",
  name: "Dan Okkels Brendstrup",
  title: "Lecturer"
});

// insert posts
db.getCollection("posts").insertMany([
  {
    caption: "Beautiful sunset at the beach",
    createdAt: new Date("2023-04-05T15:27:14Z"),
    image:
      "https://images.unsplash.com/photo-1566241832378-917a0f30db2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    uid: maria.insertedId
  },
  {
    caption: "Exploring the city streets of Aarhus",
    createdAt: new Date("2023-04-06T10:45:30Z"),
    image:
      "https://images.unsplash.com/photo-1559070169-a3077159ee16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    uid: ObjectId("65cca4b2c4d261037ec49a23")
  },
  {
    caption: "Delicious food at the restaurant",
    createdAt: new Date("2023-04-04T20:57:24Z"),
    image:
      "https://images.unsplash.com/photo-1548940740-204726a19be3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    uid: line.insertedId
  },
  {
    caption: "Exploring the city center of Aarhus",
    createdAt: new Date("2023-04-06T10:58:24Z"),
    image:
      "https://images.unsplash.com/photo-1612624629424-ddde915d3dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    uid: rasmus.insertedId
  },
  {
    caption: "A cozy morning with coffee",
    createdAt: new Date("2023-04-03T08:21:04Z"),
    image:
      "https://images.unsplash.com/photo-1545319261-f3760f9dd64d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    uid: ObjectId("65cca4b2c4d261037ec49a23")
  },
  {
    caption: "Serenity of the forest",
    createdAt: new Date("2023-04-05T14:34:04Z"),
    image:
      "https://images.unsplash.com/photo-1661505216710-32316e7b5bb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    uid: rasmus.insertedId
  },
  {
    caption: "A beautiful morning in Aarhus",
    createdAt: new Date("2023-04-06T09:10:54Z"),
    image:
      "https://images.unsplash.com/photo-1573997953524-efed43db70a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    uid: maria.insertedId
  },
  {
    caption: "Rainbow reflections of the city of Aarhus",
    createdAt: new Date("2023-04-02T20:25:34Z"),
    image:
      "https://images.unsplash.com/photo-1558443336-dbb3de50b8b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1pYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    uid: anne.insertedId
  },
  {
    caption: "The city streets of Aarhus ✨",
    createdAt: new Date("2023-04-02T20:25:34Z"),
    image:
      "https://images.unsplash.com/photo-1596150368199-1dddc9fc34cc?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    uid: rasmus.insertedId
  }
]);
