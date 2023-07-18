import connectToDatabase from "../../../utils/mongodb";
import { getDate } from "../../../lib/helpers";
import { toCurrency } from "../../../utils/dbConnect";
export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  let {
    company_name,
    bill_number,
    bill_date,
    bill_type,
    bill_amount,
    payment_status,
    check_date,
    notes,
  } = req.body;

  bill_date = getDate(bill_date);
  check_date = getDate(check_date);
  bill_amount = toCurrency(bill_amount);

  const data = await db.collection("bill").insertOne({
    company_name,
    bill_number,
    bill_date,
    bill_type,
    bill_amount,
    payment_status,
    check_date,
    notes,
  });

  res.json({ data });
}
