import { addCurrency, toCurrency } from "@utils/dbConnect";
import connectToDatabase from "@utils/mongodb";
import { getDate } from "app/bill/add/api/route";
import { NextResponse } from "next/server";
const mongodb = require("mongodb");

export async function PUT(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
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

    await db
      .collection("exp")
      .updateOne(
        { _id: new mongodb.ObjectId(id) },
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
      .catch((err) => NextResponse.error({ error: err.message, status: 500 }));

    return NextResponse.json({ done: true });
  } catch (error) {
    console.log(error);
    return NextResponse.error({ error: error.message, status: 500 });
  }
}
