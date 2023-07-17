import { getDate } from "../../../lib/helpers";
import { addCurrency, toCurrency } from "../../../utils/dbConnect";
import connectToDatabase from "../../../utils/mongodb";

const mongodb = require("mongodb");

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  const id = req.query._id;

  let {
    day_sell,
    shop_exp,
    other_exp,
    total_sell,
    deposed_amount,
    exp_date,
    notes,
  } = req.body;

  total_sell = addCurrency(day_sell, shop_exp, other_exp);
  exp_date = getDate(exp_date);
  day_sell = toCurrency(day_sell);
  shop_exp = toCurrency(shop_exp);
  other_exp = toCurrency(other_exp);
  deposed_amount = toCurrency(deposed_amount);
  total_sell = toCurrency(total_sell);
  await db
    .collection("exps")
    .updateOne(
      { _id: mongodb.ObjectId(id) },
      {
        $set: {
          day_sell,
          shop_exp,
          other_exp,
          total_sell,
          deposed_amount,
          exp_date,
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
