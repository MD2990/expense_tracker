import {
  AddIcon,
  CheckCircleIcon,
  RepeatIcon,
  WarningTwoIcon,
} from "@chakra-ui/icons";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { useSnapshot } from "valtio";
import { Btn, PrintBtn } from "../comUtil/ComUtil";
import SearchInput from "../comUtil/SearchInput";
import state from "../store";
import { toPDF } from "../../utils/dbConnect";
import TotalText from "../sharedCom/TotalText";
import { BackButton } from "../sharedCom/Comp";

export const BillButtons = ({ data }) => {
  const snap = useSnapshot(state);

  const router = useRouter();

  const clear = () => {
    state.searchTerm = "";
    state.paymentText = "Filter by Payment";
    state.bill = data;
  };

  function getPaid() {
    state.bill = data;
    state.paid = !state.paid;
    state.bill = state.bill.filter((b) => b.payment_status !== state.paid);

    state.paid ? (state.paymentText = "Paid") : (state.paymentText = "Pending");
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

    return toPDF(rows, columns, "bill Details");
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
          title={snap.paymentText}
          icon={
            snap.paymentText == "Paid" ? (
              <CheckCircleIcon />
            ) : snap.paymentText == "Pending" ? (
              <WarningTwoIcon />
            ) : null
          }
          color={
            snap.paymentText == "Paid"
              ? "turquoise"
              : snap.paymentText == "Pending" && "red.400"
          }
          click={getPaid}
        />
      </WrapItem>

      {snap.searchResults.length !== data.length ? (
        <WrapItem>
          <TotalText text={`Results ${snap.searchResults.length} of ${data.length}`} />
        </WrapItem>
      ) : (
        <WrapItem>
          <TotalText text={`Total Bills: ${snap.bill.length}`} />
        </WrapItem>
      )}
    </Wrap>
  );
};
