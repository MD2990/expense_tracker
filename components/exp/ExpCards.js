import { Wrap } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";
import { handleFormDelete } from "../../lib/helpers";
import { handleDelete } from "../../utils/dbConnect";
import { MySkeletons, Title } from "../comUtil/ComUtil";
import SingleCard, { AllText } from "../sharedCom/SingleCard";
import state from "../store";

export default function ExpCards() {
  const snap = useSnapshot(state);

  const router = useRouter();

  const rs = useCallback(
    () => state.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [snap.exp, rs]);

  if (!snap.exp) return <MySkeletons />;
  if (snap.exp.length < 1) return <Title title="No Expenses Added Yet " />;
  return (
    <>
      {rs()?.map(
        ({
          _id,
          day_sell,
          shop_exp,
          other_exp,
          total_sell,
          deposed_amount,
          exp_date,
          notes,
        }) => {
          return (
            <Wrap key={_id} justify="center" spacing="4">
              <SingleCard
              
                link={`/${_id}/EditExp`}
                header={_id.substring(16)}
                deleteFunction={async () => {
                  await handleFormDelete({
                    deleteUrl: "exp/del",
                    id: _id,
                    handleDelete,
                  });

                  if (state.isDeleted) {
                    state.exp = snap.exp.filter((item) => item._id !== _id);
                  }
                  state.isDeleted = false;
                }}
              >
                <AllText title=" Daily Sell:" data={day_sell} />
                <AllText title=" Shop Expenses:" data={shop_exp} />
                <AllText title=" Other Expenses:" data={other_exp} />
                <AllText title=" Total Sell:" data={total_sell} />
                <AllText title=" Deposed Amount:" data={deposed_amount} />
                <AllText title=" Date:" data={exp_date} />
                <AllText title=" Notes:" data={notes} />
                <AllText title=" Daily Sell:" data={day_sell} />
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
