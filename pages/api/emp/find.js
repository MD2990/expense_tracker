import connectToDatabase from "../../../utils/mongodb";

const mongodb = require("mongodb");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let { _id } = req.query;

  _id = new mongodb.ObjectId(_id);

  const data = await db
    .collection("emp")
    .findOne({ _id: new mongodb.ObjectId(_id) });
  res.json({ data });
}
