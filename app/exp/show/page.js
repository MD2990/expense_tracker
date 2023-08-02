import React from "react";
import { getData } from "app/db";
import ShowExp from "./ShowExp";
export const dynamic = "force-dynamic";

export default async function page() {
  const exp = await getData(`/exp/show/api`);
  return <ShowExp exp={exp} />;
}
