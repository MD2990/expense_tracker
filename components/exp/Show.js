import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React from "react";
import Paginate from "../comUtil/Paginate";

import { ExpButtons } from "../exp/ExpButtons";
import ExpCards from "./ExpCards";
import { MainInterface } from "../sharedCom/Comp";

export default function ShowExps() {
  return (
    <>
      <Title title="Expenses" />
      <MainInterface>
        <ExpButtons  />

        <Divider mt="-4" />

        <ExpCards  />
      </MainInterface>
      <HStack mt="12" justify="center" alignItems="center" align="center">
        <Paginate />
      </HStack>
    </>
  );
}
