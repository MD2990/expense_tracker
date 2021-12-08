import { getDate } from "../../../lib/helpers";
import { getSum, toCurrency } from "../../../utils/dbConnect";
import connectToDatabase from "../../../utils/mongodb";

var mongodb = require("mongodb");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const id = req.query._id;

  let { basic_salary, bonus, loans, total_salary, sal_notes, salary_date } =
    req.body;

  total_salary = getSum(basic_salary, bonus, loans);
  salary_date = getDate(salary_date);
  total_salary = toCurrency(total_salary);
  loans = toCurrency(loans);
  bonus = toCurrency(bonus);
  basic_salary = toCurrency(basic_salary);

  await db
    .collection("sal")
    .updateOne(
      { _id: mongodb.ObjectId(id) },
      {
        $set: {
          basic_salary,
          bonus,
          loans,
          total_salary,
          sal_notes,
          salary_date,
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
