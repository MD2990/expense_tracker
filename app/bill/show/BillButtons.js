"use client";
import React from "react";
import {
  AddIcon,
  CalendarIcon,
  CheckCircleIcon,
  RepeatIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSnapshot } from "valtio";
import { Btn, PrintBtn } from "@components/comUtil/ComUtil";
import SearchInput from "@components/comUtil/SearchInput";
import state from "@components/store";
import { toPDF } from "@utils/dbConnect";
import TotalText from "@components/sharedCom/TotalText";
import { BackButton } from "@components/sharedCom/Comp";

export const BillButtons = ({ data }) => {
  const snap = useSnapshot(state);
  const router = useRouter();
  const clear = () => {
    state.searchTerm = "";

    state.bill = data;
    state.paidOrNotFiltered = false;
  };

  function getPaid() {
    state.paidOrNotFiltered = true;
    state.bill = data;
    state.paid = !state.paid;
    state.bill = state.bill.filter((b) => b.payment_status !== state.paid);
  }

  function printPdf() {
    const rows = state.searchResults.map(
      (
        {
          company_name,
          bill_number,
          bill_amount,
          bill_type,
          bill_date,
          check_date,
          payment_status,
          notes,
        },
        index
      ) => {
        index += 1;
        const data = {
          company_name,
          bill_number,
          bill_amount,
          bill_type,
          bill_date,
          check_date,
          notes,
          ...(payment_status
            ? { payment_status: "Paid" }
            : { payment_status: "Pending" }),
          ...(bill_type === "Cash" ? { check_date: "N/A" } : { check_date }),

          index,
        };

        return data;
      }
    );

    const columns = [
      { title: "#", key: "index" },
      { title: "Company Name", key: "company_name" },
      { title: "bill Number", key: "bill_number" },
      { title: "bill Amount", key: "bill_amount" },
      { title: "bill Type", key: "bill_type" },
      { title: "bill Date", key: "bill_date" },
      { title: "Check Date", key: "check_date" },
      { title: "Payment Status", key: "payment_status" },
      { title: "Remarks", key: "notes" },
    ];

    return toPDF(rows, columns, "Bills");
  }
  return (
    <Wrap spacing="4" justify="center" align="center" m="2" p="2">
      <WrapItem>
        <BackButton ml="0" />
      </WrapItem>
      <WrapItem>
        <SearchInput data={snap.bill} />
      </WrapItem>

      <WrapItem>
        <Btn icon={<RepeatIcon />} click={clear} title="Show All" />
      </WrapItem>
      <WrapItem>
        <Btn
          icon={<AddIcon />}
          click={() => router.push("/AddBill")}
          title="Add"
        />
      </WrapItem>
      {snap.searchResults.length > 0 && (
        <WrapItem>
          <PrintBtn click={() => printPdf()} />
        </WrapItem>
      )}

      <WrapItem>
        <Btn
          title="Filter By Payment"
          icon={
            !snap.paid ? (
              <CheckCircleIcon />
            ) : snap.paid ? (
              <WarningTwoIcon />
            ) : (
              <CalendarIcon />
            )
          }
          color={
            snap.paidOrNotFiltered
              ? snap.paid
                ? "turquoise"
                : "red.400"
              : "gray.900"
          }
          click={getPaid}
        />
      </WrapItem>

      <WrapItem>
        <TotalText text={`Total Bills: ${snap.searchResults.length}`} />
      </WrapItem>
    </Wrap>
  );
};
