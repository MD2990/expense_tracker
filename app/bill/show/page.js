import React from "react";
import ShowBills from "./ShowBills";
import { getData } from "app/db";
export const dynamic = "force-dynamic";

export default async function page() {
  const bill = await getData(`/bill/show/api`);
  return <ShowBills bill={bill} />;
}
