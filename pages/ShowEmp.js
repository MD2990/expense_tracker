import Show from "../components/emp/Show";
import { jsonify } from "../utils/dbConnect";
import { Btn, HD, Title } from "../components/comUtil/ComUtil";
import connectToDatabase from "../utils/mongodb";
import { Box } from "@chakra-ui/layout";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import state from "../components/store";
import { useEffect } from "react";

export default function ShowEmp({ emp }) {
  const router = useRouter();

  useEffect(() => {
    state.emp = emp.sort((a, b) => (a.emp_name > b.emp_name ? 1 : -1));
  }, [emp]);

  if (emp.length === 0)
    return (
      <Title title="No employees added yet">
        <Box mt="8" pt="4">
          <Btn
            click={() => router.push("/AddEmp")}
            title="Add new employee "
            icon={<AddIcon />}
          />
        </Box>
      </Title>
    );

  return (
    <>
      <HD text="Show Employees" />
      <Show />
    </>
  );
}
export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const data = await db.collection("emp").find({}).toArray();

  if (!db || !data) {
    return {
      redirect: {
        destination: "/Error",
        permanent: false,
      },
    };
  }
  const emp = await jsonify(data);

  return {
    props: {
      emp,
    },
  };
}
