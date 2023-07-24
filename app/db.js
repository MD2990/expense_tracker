import connectToDatabase from "@utils/mongodb";
const mongodb = require("mongodb");

export async function getById({ id, collection }) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection(collection)
    .findOne({ _id: new mongodb.ObjectId(id) });
  const newData = JSON.parse(JSON.stringify(data));
  return newData;
}

/* export async function deleteById({ id, collection }) {
  try {
    const response = await db.collection(collection).deleteOne({
      _id: mongodb.ObjectId(id),
    });

    if (response.deletedCount > 0) return true;
    else return false;
  } catch (error) {
    throw new Error(error.message);
  }
} */

