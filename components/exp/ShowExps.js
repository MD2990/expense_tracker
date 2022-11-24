import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import Paginate from "../comUtil/Paginate";
import { ExpButtons } from "./ExpButtons";
import { MainInterface } from "../sharedCom/Comp";
import { useSnapshot } from "valtio";
import state from "../store";
import { handleFormDelete } from "../../lib/helpers";

import { handleDelete } from "../../utils/dbConnect";

import MyTable from "../MyTable";

export default function ShowExps({ exp }) {
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
    // filter out the exp
    await handleFormDelete({
      deleteUrl: "/exp/del",
      id: _id,
      handleDelete,
    });
    if (state.isDeleted) {
      state.exp = state.exp.filter((b) => b._id !== _id);
    }
    state.isDeleted = false;
  }

  const editFunc = (e) => `/${e._id}/EditExp`;

  const rs = useCallback(
    // eslint-disable-next-line valtio/state-snapshot-rule
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.searchResults, snap.offset, snap.PER_PAGE]
  );

  useEffect(() => {
    state.exp = exp.sort((a, b) => (a.exp_date > b.exp_date ? -1 : 1));
  }, [exp]);
  useEffect(() => {
    return () => {
      state.searchTerm = "";
      state.paymentText = "Filter by Payment";
    };
  }, []);
  return (
    <>
      <Title title="Expenses" />
      <MainInterface>
        <ExpButtons />

        <Divider mt="-8" />
        {snap.searchResults.length ? (
          <MyTable
            size="sm"
            data={rs()}
            tableTitle="Expenses"
            tableHeads={tableHeads}
            tableRows={tableRows}
            editFunc={editFunc}
            deleteFunc={deleteFunc}
          />
        ) : (
          <Title title="Nothing to Show... " />
        )}
      </MainInterface>
      <HStack mt="12" justify="center" alignItems="center" align="center">
        <Paginate />
      </HStack>
    </>
  );
}
