import React from "react";
import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import { useSnapshot } from "valtio";
import { toPDF } from "../../utils/dbConnect";
import { Btn, PrintBtn } from "../comUtil/ComUtil";
import SearchInput from "../comUtil/SearchInput";
import TotalText from "../sharedCom/TotalText";
import state from "../store";
import { BackButton } from "../sharedCom/Comp";

export const ExpButtons = () => {
  const snap = useSnapshot(state);

  const router = useRouter();

  const clear = () => {
    state.searchTerm = "";
    state.exp = state.exp;
  };

  function printPdf() {
    const rows = state.searchResults.map(
      (
        {
          _id,
          day_sell,
          shop_exp,
          other_exp,
          total_sell,
          deposed_amount,
          exp_date,

          notes,
        },
        index
      ) => {
        index += 1;
        const id = _id.substring(16);
        const data = {
          id,
          day_sell,
          shop_exp,
          other_exp,
          total_sell,
          deposed_amount,
          exp_date,
          notes,

          index,
        };

        return data;
      }
    );

    const columns = [
      { title: "#", key: "index" },
      { title: "ID", key: "id" },
      { title: "Daily Sell", key: "day_sell" },
      { title: "Shop Expenses", key: "shop_exp" },
      { title: "Other Expenses", key: "other_exp" },
      { title: "Total Sell", key: "total_sell" },
      { title: "Deposed Amount", key: "deposed_amount" },
      { title: "Date", key: "exp_date" },
      { title: "Remarks", key: "notes" },
    ];

    return toPDF(rows, columns, "Expenses");
  }
  return (
    <Wrap spacing="4" justify="center" align="center" p="2" m="2">
      <WrapItem>
        <BackButton />
      </WrapItem>
      <WrapItem>
        <SearchInput data={snap.exp} />
      </WrapItem>
      <WrapItem>
        <Btn icon={<RepeatIcon />} click={() => clear()} title="Show All" />
      </WrapItem>
      <WrapItem>
        <Btn
          icon={<AddIcon />}
          click={() => router.push("/AddExp")}
          title="Add New"
        />
      </WrapItem>
      {snap.searchResults.length > 0 && (
        <WrapItem>
          <PrintBtn click={() => printPdf()} />
        </WrapItem>
      )}
      {snap.searchResults.length !== snap.exp.length ? (
        <WrapItem>
          <TotalText
            text={`Results ${snap.searchResults.length} of ${snap.exp.length}`}
          />
        </WrapItem>
      ) : (
        <WrapItem>
          <TotalText text={`Total Expenses: ${snap.exp.length}`} />
        </WrapItem>
      )}
    </Wrap>
  );
};
