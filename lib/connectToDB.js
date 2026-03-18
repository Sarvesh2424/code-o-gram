import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;

export const connectToDB = async () => {
  const client = new MongoClient(URI);
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db();
  } catch (err) {
    console.log("Error connecting to MongoDB");
  }
};
