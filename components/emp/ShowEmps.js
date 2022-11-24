import { EmpButtons } from "./EmpButtons";
import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import Paginate from "../comUtil/Paginate";
import { MainInterface } from "../sharedCom/Comp";
import { useSnapshot } from "valtio";
import state from "../store";
import { handleFormDelete } from "../../lib/helpers";
import { handleDelete } from "../../utils/dbConnect";
import MyTable from "../MyTable";

export default function ShowEmps({ emp }) {
  const snap = useSnapshot(state);

  const tableHeads = useMemo(
    () => [
      "No",
      "Name",
      " Passport No.",
      " Civil ID",
      " Job",
      "Employment Date",
      "Notes",
      "edit",
      "delete",
    ],
    []
  );

  const tableRows = useMemo(
    () => [
      "no",
      "emp_name",
      "passport_number",
      "civil_id",
      "job",
      "empl_Date",
      "notes",
      "edit",
      "delete",
    ],
    []
  );

  async function deleteFunc({ _id }) {
    // filter out the emp
    await handleFormDelete({
      deleteUrl: "/emp/del",
      id: _id,
      handleDelete,
    });
    if (state.isDeleted) {
      state.emp = state.emp.filter((b) => b._id !== _id);
    }
    state.isDeleted = false;
  }

  const editFunc = (e) => `/${e._id}/EditEmp`;

  const rs = useCallback(
    // eslint-disable-next-line valtio/state-snapshot-rule
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.searchResults, snap.offset, snap.PER_PAGE]
  );

  useEffect(() => {
    state.emp = emp.sort((a, b) => (a.empl_Date > b.empl_Date ? -1 : 1));
  }, [emp]);
  useEffect(() => {
    return () => (state.searchTerm = "");
  }, []);

  return (
    <>
      <Title title="Employees Details" />
      <MainInterface>
        <EmpButtons />

        <Divider mt="-8" />
        {snap.searchResults.length ? (
          <MyTable
            size="sm"
            data={rs()}
            tableTitle="Employees Details"
            tableHeads={tableHeads}
            tableRows={tableRows}
            editFunc={editFunc}
            deleteFunc={deleteFunc}
          />
        ) : (
          <Title title="Nothing to Show... " />
        )}
      </MainInterface>

      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
