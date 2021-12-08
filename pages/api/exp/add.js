import { getDate } from "../../../lib/helpers";
import { addCurrency, toCurrency } from "../../../utils/dbConnect";
import connectToDatabase from "../../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

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

  const data = await db.collection("exps").insertOne({
    day_sell,
    shop_exp,
    other_exp,
    total_sell,
    deposed_amount,
    exp_date,
    notes,
  });

  res.json({ data });
}
