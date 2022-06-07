import React, { useEffect } from "react";
import { Btn, HD, Title } from "../components/comUtil/ComUtil";
import ShowExps from "../components/exp/Show";
import { jsonify } from "../utils/dbConnect";
import connectToDatabase from "../utils/mongodb";
import state from "../components/store";
import { VStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export default function ShowExp({ exp }) {
  const router = useRouter();
  useEffect(() => {
    state.exp = exp.sort((a, b) => (a.exp_date > b.exp_date ? 1 : -1));
  }, [exp]);
  if (exp.length < 1)
    return (
      <VStack>
        <Title title="No Expenses Added Yet" />;
        <Btn
          icon={<AddIcon />}
          click={() => router.push("/AddExp")}
          title="Add Expense"
        />
      </VStack>
    );

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
