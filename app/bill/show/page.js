import React from "react";
import ShowBills from "./ShowBills";
import connectToDatabase from "@utils/mongodb";

async function getData() {
  const { db } = await connectToDatabase();
  const data = await db.collection("bill").find({}).toArray();
  const  bill  = JSON.parse(JSON.stringify(data));
  return bill;
}

export default async function page() {
  const bill = await getData();
  return <ShowBills bill={bill} />;
}
