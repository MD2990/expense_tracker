import { useRouter } from "next/router";
import React from "react";
import { jsonify } from "../../utils/dbConnect";
import { HD, Spans } from "../../components/comUtil/ComUtil";
import Edit_Delete_Emp from "../../components/emp/Edit_Delete";
import connectToDatabase from "../../utils/mongodb";
const mongodb = require("mongodb");

export default function EditEmp({ emp }) {
  const router = useRouter();
 
  if (router.isFallback) {
    return <Spans />;
  }

  return (
    <>
      <HD text={emp.emp_name} />

      <Edit_Delete_Emp emp={emp} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
  const data = await db
    .collection("emp")
    .findOne({ _id: mongodb.ObjectId(params.id) });
  const emp = await jsonify(data);

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
      emp,
    },
    revalidate: 1,
  };
}
export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const emp = await db.collection("emp").find({}).toArray();

  // Get the paths we want to pre-render based on posts
  const paths = emp.map((c) => ({
    params: { id: c._id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}
