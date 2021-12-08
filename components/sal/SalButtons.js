import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { useSnapshot } from "valtio";
import { getItem } from "../../lib/helpers";
import { toPDF } from "../../utils/dbConnect";
import { Btn, PrintBtn } from "../comUtil/ComUtil";
import SearchInput from "../comUtil/SearchInput";
import { BackButton } from "../sharedCom/Comp";
import TotalText from "../sharedCom/TotalText";
import state from "../store";

export const SalButtons = () => {
  const snap = useSnapshot(state);
  const router = useRouter();
  const { id } = router.query;


  const clear = () => {
    state.searchTerm = "";
    state.sal=snap.sal;
  };

  function printPdf() {
    const employee = getItem("emp");
    const rows = snap.searchResults.map(
      (
        { basic_salary, bonus, loans, total_salary, sal_notes, salary_date },
        index
      ) => {
        index += 1;
        const data = {
          basic_salary,
          bonus,
          loans,
          total_salary,
          sal_notes,
          salary_date,
          employee,

          index,
        };

        return data;
      }
    );

    const columns = [
      { title: "#", key: "index" },
      { title: "Name", key: "employee" },
      { title: "Basic Salary", key: "basic_salary" },
      { title: "Bonus", key: "bonus" },
      { title: "Loans", key: "loans" },
      { title: "Total Salary", key: "total_salary" },
      { title: "Salary Date", key: "salary_date" },
      { title: "Remarks", key: "sal_notes" },
    ];

    return toPDF(rows, columns, "Employees Salary Details");
  }
  return (
    <Wrap spacing="4" justify="center" align="center" m="2" p="2">
      <WrapItem>
        <BackButton ml="0" />
      </WrapItem>
      <WrapItem>
        <SearchInput data={snap.sal} />
      </WrapItem>
      <WrapItem>
        <Btn icon={<RepeatIcon />} click={() => clear()} title="Show All" />
      </WrapItem>
      <WrapItem>
        <Btn
          icon={<AddIcon />}
          click={() => router.push(`/${id}/AddSalary`)}
          title="Add"
        />
      </WrapItem>

      <WrapItem>
        <PrintBtn click={() => printPdf()} />
      </WrapItem>

      {snap.searchTerm.trim() != "" && (
        <WrapItem>
          <TotalText text={`${snap.searchResults.length} of`} />
        </WrapItem>
      )}
      <WrapItem>
        <TotalText text={`Total:  ${snap.sal?.length}`} />
      </WrapItem>
    </Wrap>
  );
};
