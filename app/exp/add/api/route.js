import { NextResponse } from "next/server";
import connectToDatabase from "@utils/mongodb";
import { addCurrency, toCurrency } from "@utils/dbConnect";
import { format } from "date-fns";
export const getDate = (theDate) => {
  const date = format(new Date(theDate), "yyyy-MM-dd");
  return date;
};
export async function POST(request) {
  try {
    const { db } = await connectToDatabase();

    const data = await request.json();
    let {
      day_sell,
      shop_exp,
      other_exp,
      total_sell,
      deposed_amount,
      exp_date,
      notes,
    } = data;

    total_sell = addCurrency(day_sell, shop_exp, other_exp);
    exp_date = getDate(exp_date);
    day_sell = toCurrency(day_sell);
    shop_exp = toCurrency(shop_exp);
    other_exp = toCurrency(other_exp);
    deposed_amount = toCurrency(deposed_amount);
    total_sell = toCurrency(total_sell);

    await db.collection("exp").insertOne({
      day_sell,
      shop_exp,
      other_exp,
      total_sell,
      deposed_amount,
      exp_date,
      notes,
    });

    return NextResponse.json({ msg: "Added successfully !" });
  } catch (error) {
    return NextResponse.error(error);
  }
}
