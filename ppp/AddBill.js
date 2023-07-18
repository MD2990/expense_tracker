import React from "react";
import AddBills from "../app/bill/add/AddBills";
import { HD } from "../components/comUtil/ComUtil";

export default function AddBill() {
  return (
    <>
      <HD title="Add New Bill" />
      <AddBills />
    </>
  );
}
