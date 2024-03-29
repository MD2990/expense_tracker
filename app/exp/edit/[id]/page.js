import React from "react";
import Edit from "./Edit";
import { getById } from "app/db";

export default async function page({ params }) {
 const id = params?.id;
  const exp = await getById({ id, collection: "exp" });
  return <Edit exp={exp} />;
}
