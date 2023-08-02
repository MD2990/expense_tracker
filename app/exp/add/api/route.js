import { NextResponse } from "next/server";
import connectToDatabase from "@utils/mongodb";
import { toCurrency } from "@utils/dbConnect";
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

    await db.collection("bill").insertOne({
      company_name,
      bill_number,
      bill_date,
      bill_type,
      bill_amount,
      payment_status,
      check_date,
      notes,
    });

    return NextResponse.json({ msg: "Added successfully !" });
  } catch (error) {
    return NextResponse.error(error);
  }
}
