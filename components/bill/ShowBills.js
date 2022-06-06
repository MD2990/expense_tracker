import { NothingFound, Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import Paginate from "../comUtil/Paginate";
import { BillButtons } from "./BillButtons";
import { MainInterface } from "../sharedCom/Comp";
import MyTable from "../MyTable";
import { useSnapshot } from "valtio";
import state from "../store";
import { handleFormDelete } from "../../lib/helpers";
import { handleDelete } from "../../utils/dbConnect";

export default function ShowBills({ bill }) {
  const snap = useSnapshot(state);

  const tableHeads = useMemo(
    () => [
      "No",
      "company name",
      "Bill No",
      "Amount",
      "Type",
      "payment Status",
      "notes",
      "bill date",
      "check date",
      "edit",
      "delete",
    ],
    []
  );

  const tableRows = useMemo(
    () => [
      "no",
      "company_name",
      "bill_number",
      "bill_amount",
      "bill_type",
      "payment_status",
      "notes",
      "bill_date",
      "check_date",
      "edit",
      "delete",
    ],
    []
  );

  async function deleteFunc({ _id }) {
    // filter out the bill
    await handleFormDelete({
      deleteUrl: "/bill/del",
      id: _id,
      handleDelete,
    });
    if (state.isDeleted) {
      state.bill = state.bill.filter((b) => b._id !== _id);
    }
    state.isDeleted = false;
  }

  const editFunc = (e) => `/${e._id}/EditBill`;

  const rs = useCallback(
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.searchResults, snap.offset, snap.PER_PAGE]
  );

  useEffect(() => {
    state.bill = bill.sort((a, b) => (a.bill_date > b.bill_date ? -1 : 1));
  }, [bill]);
  useEffect(() => {
    state.searchTerm = "";
  }, []);

/*   if (snap.searchResults.length < 1)
    return <NothingFound title="No Bills Added Yet" link="/AddBill" />; */

  return (
    <>
      <Title title="Bill Details" />
      <MainInterface>
        <BillButtons data={bill} />
        <Divider mt="-8" />
        {snap.searchResults.length  ? (
          <MyTable
            size="sm"
            data={rs()}
            tableTitle="Bills"
            tableHeads={tableHeads}
            tableRows={tableRows}
            editFunc={editFunc}
            deleteFunc={deleteFunc}
          />
        ):<Title title="No Bills Added Yet" />}
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
