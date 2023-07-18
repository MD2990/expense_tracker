import { NextResponse } from "next/server";
import connectToDatabase from "@utils/mongodb";

export async function GET() {
  const { db } = await connectToDatabase();
  const bill = await db.collection("bill").find({}).toArray();

  return NextResponse.json({ bill });
}
