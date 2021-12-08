import connectToDatabase from "../../../utils/mongodb";

var mongodb = require("mongodb");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const {emp_id} = req.query;


  const data = await db
    .collection("sal")
    .find({ emp_id: mongodb.ObjectId(emp_id) })
    .toArray();

  res.json({ data });
}
