import connectToDatabase from "@utils/mongodb";
const mongodb = require("mongodb");

const { db } = await connectToDatabase();
export async function getById({ id, collection }) {
  try {
    const data = await db
      .collection(collection)
      .findOne({ _id: new mongodb.ObjectId(id) });
    const newData = JSON.parse(JSON.stringify(data));
    return newData;
  } catch (error) {
    console.log(error);
  }
}

export async function getData(url) {
  try {
    const ip = process.env.NEXT_PUBLIC_VERCEL_URL;
    const res = await fetch(ip + url, { cache: "no-store" });
    const data = await res.json();
    return data;
  } catch (error) {
    throw Error(error.message);
  }
}

export async function deleteById({ id, collection }) {
  try {
    const response = await db.collection(collection).deleteOne({
      _id: mongodb.ObjectId(id),
    });

    if (response.deletedCount > 0) return true;
    else return false;
  } catch (error) {
    throw new Error(error.message);
  }
}
