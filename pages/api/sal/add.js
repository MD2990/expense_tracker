import { getDate } from "../../../lib/helpers";
import { getSum, toCurrency } from "../../../utils/dbConnect";
import connectToDatabase from "../../../utils/mongodb";
const mongodb = require("mongodb");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  let {
    basic_salary,
    bonus,
    loans,
    total_salary,
    sal_notes,
    salary_date,
    emp_id,
  } = req.body;

  emp_id = mongodb.ObjectId(emp_id);

  total_salary = getSum(basic_salary, bonus, loans);
  salary_date = getDate(salary_date);
  bonus = toCurrency(bonus);
  loans = toCurrency(loans);
  total_salary = toCurrency(total_salary);
  basic_salary = toCurrency(basic_salary);

  const data = await db.collection("sal").insertOne({
    basic_salary,
    bonus,
    loans,
    total_salary,
    sal_notes,
    salary_date,
    emp_id,
  });

  res.json({ data });
}
