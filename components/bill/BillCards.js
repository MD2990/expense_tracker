import { Wrap } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { MySkeletons, Title } from "../comUtil/ComUtil";
import state from "../store";
import SingleCard, { AllText } from "../sharedCom/SingleCard";
import { handleFormDelete } from "../../lib/helpers";
import { handleDelete } from "../../utils/dbConnect";

export default function BillCards() {
  const snap = useSnapshot(state);
  

  const rs = useCallback(
    () => state.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs]);

  if (!snap.bill) return <MySkeletons />;
  if (!snap.bill.length) return <Title title="No Bills Added Yet " />;
  return (
    <>
      {rs()?.map(
        ({
          _id,
          company_name,
          bill_number,
          bill_date,
          bill_type,
          bill_amount,
          payment_status,
          check_date,
          notes,
        }) => {
          return (
            <Wrap key={_id} justify="center" spacing="4">
              <SingleCard
                link={`/${_id}/EditBill`}
                header={`Bill No. ${bill_number}`}
                color={payment_status ? "turquoise" : "red.400"}
                deleteFunction={async () => {
                  await handleFormDelete({
                    deleteUrl: "bill/del",
                    id: _id,
                    handleDelete,
                   
                    secondDelete: () =>
                      (state.bill = snap.bill.filter(
                        (item) => item._id !== _id
                      )),
                   
                  });
                }}
              >
                <AllText title=" Company Name:" data={company_name} />
                <AllText title=" Type:" data={bill_type} />

                <AllText title=" Amount:" data={bill_amount} />

                <AllText
                  title=" Payment Status:"
                  data={payment_status ? "Paid" : "Pending"}
                  color={`${payment_status ? "turquoise" : "red.400"}`}
                />
                <AllText title=" Check Date:" data={check_date} />
                <AllText title=" Bill Date:" data={bill_date} />
                <AllText title=" Notes:" data={notes} />
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
