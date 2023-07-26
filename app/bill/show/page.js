import React from "react";
import ShowBills from "./ShowBills";

export const dynamic = "force-dynamic";
async function getData() {
  const res = await fetch("http://localhost:3000/bill/show/api", {
    cache: "no-store",
  });
  const bill = await res.json();
  return bill;
}

export default async function page() {
  const bill = await getData();
  return <ShowBills bill={bill} />;
}
