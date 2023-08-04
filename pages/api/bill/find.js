import connectToDatabase from "../../../utils/mongodb";

const mongodb = require("mongodb");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("bill")
    .findOne({ _id: new mongodb.ObjectId(req.query._id) });
  res.json({ data });
}
