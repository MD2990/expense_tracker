import React from "react";
import useSWR from "swr";
import ShowBills from "../components/bill/ShowBills";
import { HD, MySkeletons, Title } from "../components/comUtil/ComUtil";
import state from "../components/store";
import { jsonify } from "../utils/dbConnect";
import connectToDatabase from "../utils/mongodb";

export default function ShowBill({ bill }) {



  const { data, error } = useSWR("/api/bill", {
    initialData: bill,
    revalidateOnMount: true,
  });

  if (error) return <Title title="Something went wrong, please try again" />;
  if (!data) return <MySkeletons />;


  state.bill = data.data.sort((a, b) => (a.bill_date > b.bill_date ? 1 : -1));
  return (
    <>
      <HD text="Show Bills" />

      <ShowBills
       
      />
    </>
  );
}
export async function getStaticProps() {
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