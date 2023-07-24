import { useRouter } from "next/dist/client/router";
import React from "react";
import { HD, Spans } from "../../components/comUtil/ComUtil";
import Edit_Delete_Exp from "../../components/exp/Edit_Delete_Exp";
import { jsonify } from "../../utils/dbConnect";
import connectToDatabase from "../../utils/mongodb";
const mongodb = require("mongodb");

export default function EditExp({ exp }) {
  const router = useRouter();

  if (router.isFallback) {
    return <Spans />;
  }
  return (
    <>
      <HD text={exp._id.substring(16)} />
      <Edit_Delete_Exp exp={exp} />
    </>
  );
}
export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("exps")
    .findOne({ _id: mongodb.ObjectId(params.id) });

  let exp = await jsonify(data);

  if (!db || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  exp.shop_exp = exp.shop_exp.replace("OMR", "");
  exp.day_sell = exp.day_sell.replace("OMR", "");
  exp.other_exp = exp.other_exp.replace("OMR", "");
  exp.total_sell = exp.total_sell.replace("OMR", "");
  exp.deposed_amount = exp.deposed_amount.replace("OMR", "");

  return {
    props: {
      exp,
    },
    revalidate: 1,
  };
}
export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const data = await db.collection("exps").find({}).toArray();

  // Get the paths we want to pre-render based on posts
  const paths = data.map((c) => ({
    params: { id: c._id.toString() },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}
