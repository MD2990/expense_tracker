import React from "react";
import ShowBills from "./ShowBills";

async function getData() {
  const data = await fetch("http://localhost:3000/bill/show/api", {
    next: {
      revalidate: 5,
    },
  });
  const { bill } = await data.json();
  return bill;
}

export default async function page() {
  const bill = await getData();
  return <ShowBills bill={bill} />;
}
