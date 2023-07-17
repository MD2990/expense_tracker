import React from "react";
import AddExps from "../components/exp/AddExps";
import { HD } from "../components/comUtil/ComUtil";

export default function AddBill() {
  return (
    <>
      <HD text="Add Expense" />
      <AddExps />
    </>
  );
}
