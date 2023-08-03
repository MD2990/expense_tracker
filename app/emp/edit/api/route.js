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

    let { empl_Date } = data;

    empl_Date = getDate(empl_Date);
    await db
      .collection("emp")
      .updateOne(
        { _id: new mongodb.ObjectId(id) },
        {
          $set: {
            empl_Date,
            ...data,
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
