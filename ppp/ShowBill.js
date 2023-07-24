import React from "react";
import ShowBills from "../components/bill/ShowBills";
import { HD, MySkeletons } from "../components/comUtil/ComUtil";
import { jsonify } from "../utils/dbConnect";
import connectToDatabase from "../utils/mongodb";

export default function ShowBill({ bill }) {
  if (!bill) return <MySkeletons />;

  return (
    <>
      <HD text="Show Bills" />

      <ShowBills bill={bill} />
    </>
  );
}
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const data = await db.collection("bill").find({}).toArray();

  if (!db || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const bill = await jsonify(data);

  return {
    props: {
      bill,
    },
  };
}
