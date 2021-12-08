import React from "react";
import { HD } from "../../components/comUtil/ComUtil";
import Add from "../../components/sal/Add";
import { getItem } from "../../lib/helpers";

export default function AddSalary() {
   const id =   getItem("id");
   const emp = getItem("emp");

  return (
    <>
      <HD text={emp} />
      <Add emp={emp} id={id} />
    </>
  );
}
