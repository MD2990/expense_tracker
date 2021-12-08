import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React from "react";
import Paginate from "../comUtil/Paginate";
import { BillButtons } from "./BillButtons";
import BillCards from "./BillCards";
import { MainInterface } from "../sharedCom/Comp";

export default function ShowBills() {

  return (
    <>
      <Title title="Bill Details" />

      <MainInterface>
        <BillButtons />

        <Divider mt="-8" />

        <BillCards  />
      </MainInterface>
      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
