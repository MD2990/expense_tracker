import { getDate } from "../../../lib/helpers";
import { toCurrency } from "../../../utils/dbConnect";
import connectToDatabase from "../../../utils/mongodb";

const mongodb = require("mongodb");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const id = req.query._id;

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

  await db
    .collection("bill")
    .updateOne(
      { _id: mongodb.ObjectId(id) },
      {
        $set: {
          company_name,
          bill_number,
          bill_date,
          bill_type,
          bill_amount,
          payment_status,
          check_date,
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
