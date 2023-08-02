import React from "react";
import Edit from "./Edit";
import { getById } from "app/db";

export default async function page({ params }) {
 const id = params?.id;
  const bill = await getById({ id, collection: "bill" });
  return <Edit bill={bill} />;
}
