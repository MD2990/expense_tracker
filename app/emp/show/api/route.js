import connectMongoDB from "@utils/mongodb";
import { NextResponse } from "next/server";
const mongodb = require("mongodb");
const { db } = await connectMongoDB();
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const res = await db.collection("emp").deleteOne({
      _id: new mongodb.ObjectId(id),
    });

    if (res.deletedCount > 0) return NextResponse.json({ done: true });

    return NextResponse.json({ done: false });
  } catch (error) {
    return NextResponse.error(error.message);
  }
}

export async function GET() {
  try {
    const emp = await db
      .collection("emp")
      .find()
      .sort({ emp_name: -1 })
      .toArray();

    return NextResponse.json(emp);
  } catch (error) {
    return NextResponse.error(error.message);
  }
}
