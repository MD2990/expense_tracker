import { getDate } from "../../../lib/helpers";
import connectToDatabase from "../../../utils/mongodb";

const mongodb = require("mongodb");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const id = req.query._id;

  let { emp_name, job, civil_id, passport_number, empl_Date, notes } = req.body;

  empl_Date = getDate(empl_Date);

  await db
    .collection("emp")
    .updateOne(
      { _id: new mongodb.ObjectId(id) },
      {
        $set: {
          emp_name,
          job,
          civil_id,
          passport_number,
          empl_Date,
          notes,
        },
      }
    )
    .then((obj) => {
      res.json({ obj });
    })
    .catch((err) => {
      console.log("Error: " + err);
    });
}
