import connectToDatabase from "../../../utils/mongodb";

var mongodb = require("mongodb");

export default async function handler(req, res) {
  try {
    const { db } = await connectToDatabase();

    const response = await db.collection("sal").deleteOne({
      _id: mongodb.ObjectId(req.body),
    });

    if (response.deletedCount > 0) res.json({ ok: true });
    else res.json({ ok: false });
  } catch (error) {
    res.json(error);
  }

  /* 	const response = await db
		.collection('todo')
		.deleteMany({ _id: req.body }, true); */
}
