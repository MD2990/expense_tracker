import React, { useEffect } from "react";
import { HD, Title } from "../components/comUtil/ComUtil";
import ShowExps from "../components/exp/Show";
import { jsonify } from "../utils/dbConnect";
import connectToDatabase from "../utils/mongodb";
import state from "../components/store";

export default function ShowExp({ exp }) {
  useEffect(() => {
    state.exp = exp.sort((a, b) => (a.exp_date > b.exp_date ? 1 : -1));
  }, [exp]);
  if (exp.length === 0) return <Title title="No Expenses Added Yet" />;

  return (
    <>
      <HD text="Show Expenses" />

      <ShowExps />
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
