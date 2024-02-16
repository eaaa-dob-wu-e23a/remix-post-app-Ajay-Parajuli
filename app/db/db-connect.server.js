import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URL);

async function getDatabase() {
  try {
    const connection = await client.connect();
    const db = connection.db();
    return db;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
}

// Automatically close the database connection when the Node.js process exits
process.on("exit", async () => {
  await client.close();
});

// Handle CTRL+C events
process.on("SIGINT", async () => {
  await client.close();
  process.exit();
});

const db = await getDatabase(); // Connect to the MongoDB database

export default db;
export { ObjectId };
