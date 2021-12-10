import React, { useEffect } from "react";
import useSWR from "swr";
import ShowBills from "../components/bill/ShowBills";
import { HD, MySkeletons, Title } from "../components/comUtil/ComUtil";
import state from "../components/store";
import { jsonify } from "../utils/dbConnect";
import connectToDatabase from "../utils/mongodb";

export default function ShowBill({ bill }) {




  useEffect(() => {
    state.bill = bill.sort((a, b) => (a.bill_date > b.bill_date ? 1 : -1));
 
  }, [bill])

  return (
    <>
      <HD text="Show Bills" />

      <ShowBills
       
      />
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