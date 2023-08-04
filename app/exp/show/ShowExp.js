"use client";
import { Title } from "@components/comUtil/ComUtil";
import { HStack, Divider, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import Paginate from "@components/comUtil/Paginate";
import { ExpButtons } from "./ExpButtons";
import { MainInterface } from "@components/sharedCom/Comp";
import MyTable from "@components/MyTable";
import { useSnapshot } from "valtio";
import state from "@components/store";
import { handleFormDelete } from "@lib/helpers";
import { handleDelete } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import { subscribeKey } from "valtio/utils";

export default function ShowExp({ exp }) {
  const router = useRouter();
  const toast = useToast();

  const snap = useSnapshot(state);

  const tableHeads = useMemo(
    () => [
      "No",
      "Daily Sell",
      "Shop Expenses",
      "Other Expenses",
      "Total Sell",
      "Deposed Amount",
      "Date",
      "Notes",
      "edit",
      "delete",
    ],
    []
  );

  const tableRows = useMemo(
    () => [
      "no",
      "day_sell",
      "shop_exp",
      "other_exp",
      "total_sell",
      "deposed_amount",
      "exp_date",
      "notes",
      "edit",
      "delete",
    ],
    []
  );

  async function deleteFunc({ _id }) {
    const ip = process.env.VERCEL_URL;

    // filter out the exp
    await handleFormDelete({
      deleteUrl: `${ip}/exp/show/api?id=${_id}`,
      type: "Expense",
      toast,
      handleDelete,
    });

    subscribeKey(state, "isDeleted", (v) => {
      if (v) {
        state.exp = state.exp.filter((b) => b._id !== _id);
      }
    });
    state.isDeleted = false;
  }

  const editFunc = (e) => `/exp/edit/${e._id}`;
  const rs = useCallback(
    // eslint-disable-next-line valtio/state-snapshot-rule
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.searchResults, snap.offset, snap.PER_PAGE]
  );

  useEffect(() => {
    router.refresh();
  }, [router]);
  useEffect(() => {
    state.exp = exp;
  }, [exp]);
  useEffect(() => {
    return () => {
      state.searchTerm = "";
    };
  }, []);

  return (
    <>
      <Title title="Expenses" />
      <MainInterface>
        <ExpButtons data={exp} />
        <Divider mt="-8" />
        <MyTable
          size="sm"
          data={rs()}
          tableTitle="Expenses"
          tableHeads={tableHeads}
          tableRows={tableRows}
          editFunc={editFunc}
          deleteFunc={deleteFunc}
        />
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
