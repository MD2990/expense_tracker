import { NextResponse } from "next/server";
import connectToDatabase from "@utils/mongodb";
import { getDate } from "app/bill/add/api/route";

export async function POST(request) {
  try {
    const { db } = await connectToDatabase();
    const data = await request.json();
    let { empl_Date } = data;
    empl_Date = getDate(empl_Date);
    await db.collection("emp").insertOne({
      empl_Date,
      ...data,
    });

    return NextResponse.json({ msg: "Added successfully !" });
  } catch (error) {
    return NextResponse.error(error);
  }
}
