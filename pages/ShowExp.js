import React from "react";
import useSWR from "swr";
import { HD, MySkeletons, Title } from "../components/comUtil/ComUtil";
import ShowExps from "../components/exp/Show";
import { jsonify } from "../utils/dbConnect";
import connectToDatabase from "../utils/mongodb";
import ErrorPage from "../components/sharedCom/ErrorPage";
import state from "../components/store";

export default function ShowExp({ exp }) {


  
  const { data, error } = useSWR("/api/exp", {
    revalidateOnMount: true,
    initialData: exp,
  });

  if (error) return <ErrorPage />;
  if (!data && !error) return <MySkeletons />;

  state.exp = data.data.sort((a, b) => (a.exp_date > b.exp_date ? 1 : -1));

  if (data.data.length === 0) return <Title title="No Expenses Added Yet" />;

  return (
    <>
      <HD text="Show Expenses" />

      <ShowExps
    
      />
    </>
  );
}
export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const data = await db.collection("exps").find({}).toArray();
  if (!db || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const exp = await jsonify(data);

  return {
    props: {
      exp,
    },
  };
}
