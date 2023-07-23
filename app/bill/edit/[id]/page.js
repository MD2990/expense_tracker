import React from "react";
import Edit from "./Edit";
import connectToDatabase from "@utils/mongodb";
const mongodb = require("mongodb");

async function getBill(params) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("bill")
    .findOne({ _id: new mongodb.ObjectId(params) });
  const bill = JSON.parse(JSON.stringify(data));
  return bill;
}

export default async function page({ params }) {

  const bill = await getBill(params?.id);
  return <Edit bill={bill} />;
}
