import ShowEmps from "../components/emp/ShowEmps";
import { jsonify } from "../utils/dbConnect";
import { HD, MySkeletons } from "../components/comUtil/ComUtil";
import connectToDatabase from "../utils/mongodb";

export default function ShowEmp({ emp }) {



  if (!emp) return <MySkeletons />;

  return (
    <>
      <HD text="Show Employees" />
      <ShowEmps {...{emp}} />
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
