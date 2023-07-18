import React from "react";
import Edit from "./Edit";
async function getBill(params) {
  const res = await fetch(`http://localhost:3000/bill/edit/api?id=${params}`);
  const bill = await res.json();
  return bill;
}

export default async function page({ params }) {
  const bill = await getBill(params.id);
  return <Edit bill={bill} />; 
}
