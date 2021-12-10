import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { HD, MySkeletons, Title } from "../../components/comUtil/ComUtil";
import ShowEmpSal from "../../components/sal/ShowEmpSal";
import state from "../../components/store";
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
export async function getServerSideProps({ params }) {
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
  };
}



 