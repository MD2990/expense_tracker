import connectToDatabase from "@utils/mongodb";
import { NextResponse } from "next/server";
const mongodb = require("mongodb");

export async function GET(request) {
  const { db } = await connectToDatabase();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const data = await db
    .collection("bill")
    .findOne({ _id: new mongodb.ObjectId(id) });

  return NextResponse.json(data);
}

/* export async function PUT(request) {
try {

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
    .then(() => NextResponse.json({ msg: "Updated successfully !" }))
    .catch((err) => NextResponse.error(err));
} catch (error) {
  console.log(error);
  return NextResponse.error(error.message);
}
} */
/* 


    /*    
    
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
      .then(() => NextResponse.json({ msg: "Updated successfully !" }))
      .catch((err) => NextResponse.error(err)); 
  } catch (error) {
    console.log(error);
    return NextResponse.error(error.message);
  }
} 
*/
