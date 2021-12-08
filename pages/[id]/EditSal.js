import { useRouter } from "next/dist/client/router";
import React from "react";
import { HD, MySkeletons, Spans } from "../../components/comUtil/ComUtil";
import EditDeleteSal from "../../components/sal/EditDeleteSal";
import { convertToNumber, getItem } from "../../lib/helpers";
import { jsonify } from "../../utils/dbConnect";
import connectToDatabase from "../../utils/mongodb";
const mongodb = require("mongodb");

export default function EditSal({ sal }) {
  const router = useRouter();

  if (router.isFallback) {
    return <MySkeletons />;
  }

  return (
    <>
      <HD text={getItem("emp")} />
      <EditDeleteSal sal={sal} emp={getItem("emp")} />
    </>
  );
}
export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("sal")
    .findOne({ _id: mongodb.ObjectId(params.id) });

  const sal = jsonify(data);
  if (!db || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  //convert a string to a number and remove any none number characters
  sal.basic_salary = convertToNumber(sal.basic_salary);
  sal.bonus = convertToNumber(sal.bonus);
  sal.loans = convertToNumber(sal.loans);
  sal.total_salary = convertToNumber(sal.total_salary);

  return {
    props: {
      sal,
    },
    revalidate: 1,
  };
}
export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const data = await db.collection("sal").find({}).toArray();

  // Get the paths we want to pre-render based on posts
  const paths = data.map((c) => ({
    params: { id: c._id.toString() },
  }));
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}
