import { useRouter } from "next/dist/client/router";
import React from "react";
import Edit_Delete_Bill from "../../components/bill/Edit_Delete_Bill";
import { HD, Spans } from "../../components/comUtil/ComUtil";
import { jsonify } from "../../utils/dbConnect";
import connectToDatabase from "../../utils/mongodb";
const mongodb = require("mongodb");

export default function EditBill({ bill }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Spans />;
  }
  return (
    <>
      <HD text={`Bill Number ${bill.bill_number}`} />
      <Edit_Delete_Bill bill={bill} />
    </>
  );
}
export async function getStaticProps({ params }) {

  const { db } = await connectToDatabase();
  const data = await db
    .collection("bill")
    .findOne({ _id: mongodb.ObjectId(params.id) });
    
    const bill = await jsonify(data);
  if ( !db || !data) {
    return {
      redirect: {
        destination: "/Error",
        permanent: false,
      },
    };
  }


  return {
    props: {
      bill,
    },
    revalidate: 1,
  };
}
export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const datas = await db.collection("bill").find({}).toArray();


  // Get the paths we want to pre-render based on posts
  const paths = datas.map((c) => ({
    params: { id: c._id.toString() },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}
