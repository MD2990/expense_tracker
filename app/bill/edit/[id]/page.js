import React from "react";
import Edit from "./Edit";
import { getById } from "app/db";

export default async function page({ params }) {
  const bill = await getById({ id: params?.id, collection: "bill" });
  return <Edit bill={bill} />;
}
