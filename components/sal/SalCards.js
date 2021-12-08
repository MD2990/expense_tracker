import { Wrap, Text } from "@chakra-ui/layout";
import React, { useCallback, useEffect } from "react";
import { useSnapshot } from "valtio";
import { getItem, handleFormDelete } from "../../lib/helpers";
import { handleDelete } from "../../utils/dbConnect";
import SingleCard, { AllText } from "../sharedCom/SingleCard";
import state from "../store";

export default function SalCards({ sal,emp }) {
  const snap = useSnapshot(state);
  useEffect(() => {
    state.sal = sal;
  }, [sal]);

  
  const rs = useCallback(
    () => state.searchResults.slice(snap.offset, snap.offset + snap.PER_PAGE),
    [snap.PER_PAGE, snap.offset, snap.searchResults]
  );

  useEffect(() => {
    rs();
  }, [rs, snap.sal]);

  const textCSS = {
   fontSize:['md','lg','xl','3xl'],
    fontWeight: "bold",
    fontFamily: "Times",
    color: "gray.400",
  };
  if (snap.searchResults.length < 1)
    return (
      <Text {...textCSS}>
        No Salaries Added For {"  "}
        <Text as="span" {...textCSS} color="blue.500" fontSize={['md','lg','xl','3xl']} >
          {emp?.toLocaleUpperCase()}
        </Text>
      </Text>
    );
  return (
    <>
      {rs()?.map(
        ({
          _id,
          basic_salary,
          bonus,
          loans,
          total_salary,
          sal_notes,
          salary_date,
        }) => {
          return (
            <Wrap key={_id}>
              <SingleCard
                link={`/${_id}/EditSal`}
                header={salary_date}
                deleteFunction={async () => {
                  await handleFormDelete({
                    deleteUrl: "sal/del",
                    id: _id,
                    handleDelete,
                    secondDelete: () =>
                      (state.sal = state.sal.filter((item) => item._id !== _id)),
                  });
                }}
              >
                <AllText title="Basic Salary:" data={basic_salary} />
                <AllText title="Bonus:" data={bonus} />
                <AllText title="Loans:" data={loans} />
                <AllText title="Total Salary:" data={total_salary} />
                <AllText title="Remarks:" data={sal_notes} />
              </SingleCard>
            </Wrap>
          );
        }
      )}
    </>
  );
}
