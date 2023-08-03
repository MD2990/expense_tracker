"use client";
import React from "react";
import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { Btn, PrintBtn } from "@components/comUtil/ComUtil";
import SearchInput from "@components/comUtil/SearchInput";
import state from "@components/store";
import { toPDF } from "@utils/dbConnect";
import TotalText from "@components/sharedCom/TotalText";
import { BackButton } from "@components/sharedCom/Comp";

export const EmpButtons = () => {
  const snap = useSnapshot(state);

  const router = useRouter();

  const clear = () => {
    state.searchTerm = "";
  };

  function printPdf() {
    const rows = state.searchResults.map(
      (
        { emp_name, job, civil_id, passport_number, empl_Date, notes },
        index
      ) => {
        index += 1;
        const data = {
          emp_name,
          job,
          civil_id,
          passport_number,
          empl_Date,
          notes,
          index,
        };

        return data;
      }
    );

    const columns = [
      { title: "#", key: "index" },
      { title: "Name", key: "emp_name" },
      { title: "Job", key: "job" },
      { title: "Civil ID", key: "civil_id" },
      { title: "Passport No.", key: "passport_number" },
      { title: "Employment Date", key: "empl_Date" },
      { title: "Remarks", key: "notes" },
    ];

    return toPDF(rows, columns, "Employee Details");
  }
  return (
    <Wrap spacing="4" justify="center" align="center">
      <WrapItem>
        <BackButton ml="0" mr="0" />
      </WrapItem>
      <WrapItem>
        <SearchInput data={snap.emp} />
      </WrapItem>
      <WrapItem>
        <Btn icon={<RepeatIcon />} click={clear} title="Show All" />
      </WrapItem>
      <WrapItem>
        <Btn
          icon={<AddIcon />}
          click={() => router.push("/emp/add")}
          title="Add"
        />
      </WrapItem>

      <WrapItem>
        <PrintBtn click={printPdf} />
      </WrapItem>

      {snap.searchTerm.trim() != "" && (
        <WrapItem>
          <TotalText text={`${snap.searchResults.length} of `} />
        </WrapItem>
      )}
      <WrapItem>
        <TotalText text={`Total:  ${snap.emp && snap.emp.length}`} />
      </WrapItem>
    </Wrap>
  );
};
