import { toCurrency } from "@utils/dbConnect";
import connectToDatabase from "@utils/mongodb";
import { format } from "date-fns";
import { NextResponse } from "next/server";
const mongodb = require("mongodb");

export async function PUT(request) {
  try {
    const { db } = await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const data = await request.json();

    let {
      company_name,
      bill_number,
      bill_date,
      bill_type,
      bill_amount,
      payment_status,
      check_date,
      notes,
    } = data;
    bill_date = format(new Date(bill_date), "yyyy-MM-dd");
    check_date = format(new Date(check_date), "yyyy-MM-dd");
    bill_amount = toCurrency(bill_amount);

    await db
      .collection("bill")
      .updateOne(
        { _id: new mongodb.ObjectId(id) },
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
      .catch((err) => NextResponse.error({ error: err.message, status: 500 }));

    return NextResponse.json({ done: true });
  } catch (error) {
    console.log(error);
    return NextResponse.error({ error: error.message, status: 500 });
  }
}
