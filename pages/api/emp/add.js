import connectToDatabase from "../../../utils/mongodb";
import { getDate } from "../../../lib/helpers";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  let { emp_name, job, civil_id, passport_number, empl_Date, notes } = req.body;

  empl_Date = getDate(empl_Date);

  const data = await db.collection("emp").insertOne({
    emp_name,
    job,
    civil_id,
    passport_number,
    empl_Date,
    notes,
  });

  res.json({ data });
}
