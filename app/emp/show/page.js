import React from "react";
import { getData } from "app/db";
import ShowEmp from "./ShowEmp";
export const dynamic = "force-dynamic";

export default async function page() {
  const emp = await getData(`/emp/show/api`);
  return <ShowEmp emp={emp} />;
}
