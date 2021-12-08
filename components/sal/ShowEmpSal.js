import React from "react";
import { Divider, HStack } from "@chakra-ui/layout";
import { Title } from "../comUtil/ComUtil";
import SalCards from "./SalCards";
import Paginate from "../comUtil/Paginate";
import { SalButtons } from "./SalButtons";
import {  MainInterface } from "../sharedCom/Comp";

export default function ShowEmpSal({  emp ,sal}) {



  return (
    <>
      <Title title={`${emp} Salaries Details`} />
      <MainInterface>
        
        <SalButtons/>

        <Divider mt="-4" />
        <SalCards sal={sal} emp={emp} />
      </MainInterface>

      <HStack mt='12' justify="center" alignItems="center" align="center">
        <Paginate />
      </HStack>
    </>
  );
}
