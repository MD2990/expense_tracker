"use client";
import { Title } from "@components/comUtil/ComUtil";
import { HStack, Divider, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import Paginate from "@components/comUtil/Paginate";
import { EmpButtons } from "./EmpButtons";
import { MainInterface } from "@components/sharedCom/Comp";
import MyTable from "@components/MyTable";
import { useSnapshot } from "valtio";
import state from "@components/store";
import { handleFormDelete } from "@lib/helpers";
import { handleDelete } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import { subscribeKey } from "valtio/utils";

export default function ShowEmp({ emp }) {
  const router = useRouter();
  const toast = useToast();

  const snap = useSnapshot(state);
  const tableHeads = useMemo(
    () => [
      "No",
      "Name",
      "Passport No.",
      "Civil ID",
      "Job",
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
    const ip = process.env.NEXT_PUBLIC_VERCEL_URL;

    // filter out the emp
    await handleFormDelete({
      deleteUrl: `${ip}/emp/show/api?id=${_id}`,
      type: "Employee",
      toast,
      handleDelete,
    });

    subscribeKey(state, "isDeleted", (v) => {
      if (v) {
        state.emp = state.emp.filter((b) => b._id !== _id);
      }
    });
    state.isDeleted = false;
  }

  const editFunc = (e) => `/emp/edit/${e._id}`;
  const rs = useCallback(
    // eslint-disable-next-line valtio/state-snapshot-rule
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.searchResults, snap.offset, snap.PER_PAGE]
  );

  useEffect(() => {
    router.refresh();
  }, [router]);
  useEffect(() => {
    state.emp = emp;
  }, [emp]);
  useEffect(() => {
    return () => {
      state.searchTerm = "";
    };
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
