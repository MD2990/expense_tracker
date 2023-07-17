import React from "react";
import { HD, MySkeletons } from "../components/comUtil/ComUtil";
import ShowExps from "../components/exp/ShowExps";
import { jsonify } from "../utils/dbConnect";
import connectToDatabase from "../utils/mongodb";

export default function ShowExp({ exp }) {
  if (!exp) return <MySkeletons />;
  return (
    <>
      <HD text="Show Expenses" />

      <ShowExps {...{ exp }} />
    </>
  );
}
export async function getServerSideProps() {
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
