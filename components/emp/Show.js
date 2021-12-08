import { Title } from "../comUtil/ComUtil";
import { HStack, Divider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Paginate from "../comUtil/Paginate";
import { EmpButtons } from "./EmpButtons";
import EmpCard from "./EmpCard";
import { MainInterface } from "../sharedCom/Comp";
import { useSnapshot } from "valtio";
import state from "../store";

export default function ShowEmp() {


  return (
    <>
      <Title title="Employees Details" />
      <MainInterface>
        <EmpButtons />

        <Divider mt="-6" />

        <EmpCard />
      </MainInterface>

      <HStack mt="12" justify="center">
        <Paginate />
      </HStack>
    </>
  );
}
