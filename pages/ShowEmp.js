import useSWR from "swr";
import Show from "../components/emp/Show";
import { jsonify } from "../utils/dbConnect";
import { Btn, HD, MySkeletons, Title } from "../components/comUtil/ComUtil";
import connectToDatabase from "../utils/mongodb";
import ErrorPage from "../components/sharedCom/ErrorPage";
import { Box } from "@chakra-ui/layout";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import state from "../components/store";

export default function ShowEmp({ emp }) {
  const router = useRouter();

  const { data, error } = useSWR("/api/emp", {
    revalidateOnMount: true,
    initialData: emp,
  });

  if (error) return <ErrorPage />;
  if (!data && !error) return <MySkeletons />;

  state.emp = data.data.sort((a, b) => (a.emp_name < b.emp_name ? 1 : -1));
  if (data.length === 0)
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
export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const data = await db.collection("emp").find({}).toArray();

  if (!db || !data) {
    return {
      redirect: {
        destination: "/",
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
