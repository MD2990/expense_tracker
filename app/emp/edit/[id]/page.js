import React from "react";
import Edit from "./Edit";
import { getById } from "app/db";

export default async function page({ params }) {
 const id = params?.id;
  const emp = await getById({ id, collection: "emp" });
  return <Edit emp={emp} />;
}
