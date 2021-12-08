import connectToDatabase from "../../../utils/mongodb";

var mongodb = require("mongodb");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  let { _id } = req.query;

  _id = new mongodb.ObjectId(_id);

 
  const data = await db
    .collection("emp")
    .findOne({ _id: mongodb.ObjectId(_id) });
  res.json({ data });
}
