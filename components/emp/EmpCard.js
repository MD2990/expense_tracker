import { Text, Wrap } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useSnapshot } from "valtio";
import { MySkeletons } from "../comUtil/ComUtil";
import state from "../store";
import SingleCard, { AllText } from "../sharedCom/SingleCard";
import { handleFormDelete } from "../../lib/helpers";
import { handleDelete } from "../../utils/dbConnect";

export default function EmpCard() {
  const snap = useSnapshot(state);

  const rs = useCallback(
    () => state.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [snap.emp, rs]);

  if (!snap.emp) return <MySkeletons />;
  if (snap.searchResults.length < 1)
    return (
      <Text
        fontSize="3xl"
        fontWeight="bold"
        fontFamily="Times"
        color="gray.400"
      >
        No Employees Found...
      </Text>
    );
  return (
    <>
      {rs()?.map(
        ({
          _id,
          emp_name,
          job,
          civil_id,
          passport_number,
          empl_Date,

          notes,
        }) => {
      
          return (
            <Wrap key={_id}>
              <SingleCard
                key={_id}
                _id={_id}
                showSalary
                link={`/${_id}/EditEmp`}
                header={emp_name}
                addSalary
                deleteFunction={async () => {
                  await handleFormDelete({
                    deleteUrl: "emp/del",
                    id: _id,
                    handleDelete,
                    secondDelete: () =>
                      (state.emp = state.emp.filter(
                        (item) => item._id !== _id
                      )),
                  });
                }}
              >
                <AllText title=" Passport No.:" data={passport_number} />
                <AllText title=" Employment Date:" data={empl_Date} />
                <AllText title=" Civil ID:" data={civil_id} />
                <AllText title=" Job:" data={job} />
                <AllText title=" Notes:" data={notes} />
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
