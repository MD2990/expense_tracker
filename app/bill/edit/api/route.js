import { toCurrency } from "@utils/dbConnect";
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
      company_name,
      bill_number,
      bill_date,
      bill_type,
      bill_amount,
      payment_status,
      check_date,
      notes,
    } = data;
    bill_date = getDate(bill_date);
    check_date = getDate(check_date);
    bill_amount = toCurrency(bill_amount);

    await db.collection("bill").updateOne(
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
    );

    return NextResponse.json({ done: true });
  } catch (error) {
    return NextResponse.error(error.message);
  }
}
