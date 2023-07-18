import React from "react";
import { HD } from "../components/comUtil/ComUtil";
import Main from "../app/Main";
import { jsonify } from "../utils/dbConnect";
import connectToDatabase from "../utils/mongodb";

export default function Home() {
  return (
    <>
      <HD text="Home Page" />
      <Main />
    </>
  );
}
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const data = await db.collection("bill").find({}).toArray();
  const bill = await jsonify(data);

  if (!db || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      bill,
    },
  };
}
