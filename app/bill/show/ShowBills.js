"use client";
import { Title } from "@components/comUtil/ComUtil";
import { HStack, Divider, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo } from "react";
import Paginate from "@components/comUtil/Paginate";
import { BillButtons } from "./BillButtons";
import { MainInterface } from "@components/sharedCom/Comp";
import MyTable from "@components/MyTable";
import { useSnapshot } from "valtio";
import state from "@components/store";
import { handleFormDelete } from "@lib/helpers";
import { handleDelete } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import { subscribeKey } from "valtio/utils";

export default function ShowBills({ bill }) {
  const router = useRouter();
  const toast = useToast();

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
    const ip = process.env.NEXT_PUBLIC_VERCEL_URL;

    // filter out the bill
    await handleFormDelete({
      deleteUrl: `${ip}/bill/show/api?id=${_id}`,
      type: "Bill",
      toast,
      handleDelete,
    });

    subscribeKey(state, "isDeleted", (v) => {
      if (v) {
        state.bill = state.bill.filter((b) => b._id !== _id);
      }
    });
    state.isDeleted = false;
  }

  const editFunc = (e) => `/bill/edit/${e._id}`;
  const rs = useCallback(
    // eslint-disable-next-line valtio/state-snapshot-rule
    () => snap.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.searchResults, snap.offset, snap.PER_PAGE]
  );

  useEffect(() => {
    router.refresh();
  }, [router]);
  useEffect(() => {
    state.bill = bill;
  }, [bill]);
  useEffect(() => {
    return () => {
      state.searchTerm = "";
      state.paymentText = "Filter by Payment";
    };
  }, []);

  return (
    <>
      <Title title="Bill Details" />
      <MainInterface>
        <BillButtons data={bill} />
        <Divider mt="-8" />
        <MyTable
          size="sm"
          data={rs()}
          tableTitle="Bills"
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
