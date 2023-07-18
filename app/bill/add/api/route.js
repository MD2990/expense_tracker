import { NextResponse } from "next/server";
import connectToDatabase from "@utils/mongodb";
import { toCurrency } from "@utils/dbConnect";
export const getDate = (theDate) => {
  const today = new Date(theDate);
  const dd = today.getDate();
  const mm = today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear();
  //call the function to add the leading zero
  const d = dd < 10 ? "0" + dd : dd;

  theDate = yyyy + "-" + mm + "-" + d;
  return theDate;
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
