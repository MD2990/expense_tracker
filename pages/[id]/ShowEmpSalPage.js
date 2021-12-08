import { useRouter } from "next/router";
import React from "react";
import { HD, MySkeletons } from "../../components/comUtil/ComUtil";
import ShowEmpSal from "../../components/sal/ShowEmpSal";
import { getItem } from "../../lib/helpers";
import { jsonify } from "../../utils/dbConnect";

import connectToDatabase from "../../utils/mongodb";
const mongodb = require("mongodb");

export default function ShowEmpSalPage({ sal }) {
  const emp = getItem("emp");
  const router = useRouter();

  if (router.isFallback || !sal) return <MySkeletons />;

  return (
    <>
      <HD text={emp} />

      <ShowEmpSal
        emp={emp}
        sal={sal.sort((a, b) => (a.salary_date > b.salary_date ? 1 : -1))}
      />
    </>
  );
}
export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("sal")
    .find({ emp_id: mongodb.ObjectId(params.id) })
    .toArray();

  if (!db || !data) {
    return {
      redirect: {
        destination: "/Error",
        permanent: false,
      },
    };
  }
  const sal = await jsonify(data);

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
