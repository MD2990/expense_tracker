import connectToDatabase from "../../../utils/mongodb";

var mongodb = require("mongodb");

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    const response = await db.collection("emp").deleteOne({
      _id: mongodb.ObjectId(req.body),
    });

    if (response.deletedCount > 0) {
      await db.collection("sal").deleteMany({
        emp_id: mongodb.ObjectId(req.body),
      });
      res.json({ ok: true });
    } else res.json({ ok: false });
  } catch (error) {
    res.json(error);
  }

}
