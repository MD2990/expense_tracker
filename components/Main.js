import {
  FcBusinessman,
  FcCollaboration,
  FcInspection,
  FcBullish,
  FcAcceptDatabase,
  FcKindle,
} from "react-icons/fc";

import Link from "next/link";
import { Center, StackDivider, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import React from "react";
export function CustomCol({ path, children, text }) {
  return (
    <WrapItem
      shadow="dark-lg"
      p="3"
      rounded={"xl"}
      textAlign="center"
      justifyContent="center"
    >
      <Link href={path}>
        <a>
          <Center>
            <Text
            px='2'
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              
              alignSelf="flex-end"
              fontSize={{ base: "xl", lg: "2xl", md: "xl", sm: "md" }}
              fontWeight="bold"
              textAlign="center"
              fontFamily="serif"
              minW='10rem'
              maxW='15rem'
            >
              {text}
            </Text>
            {children}
          </Center>
        </a>
      </Link>
    </WrapItem>
  );
}
export default function Main() {
  return (
    <>
      <Center m="12" mt="5%">
        <Text
          textAlign="center"
          fontSize={{ base: "xl", lg: "8xl", md: "3xl", sm: "md" }}
          fontWeight="extrabold"
          color="teal.500"
        >
          Welcome to Muscat Shopping Center
        </Text>
      </Center>

      <Wrap
        mx="4"
        mt="5%"
        divider={<StackDivider borderColor="gray.500" />}
        spacing={{ base: "1rem", lg: "2.5rem", md: "1.5rem", sm: "1rem" }}
        justify="center"
        align="center"
      >
        <CustomCol path="/ShowBill" text={"Show Bills"}>
          <FcInspection  size='4rem'  />
        </CustomCol>
        <CustomCol path="/AddBill" text={"Add Bill"}>
          <FcKindle  size='4rem'/>
        </CustomCol>

        <CustomCol path="/ShowExp" text={"Show Expenses"}>
          <FcBullish size='4rem' />
        </CustomCol>
        <CustomCol path="/AddExp" text={"Add Expense"}>
          <FcAcceptDatabase size='4rem' />
        </CustomCol>
        <CustomCol path="/ShowEmp" text={"Show Employees"}>
          <FcCollaboration size='4rem' />
        </CustomCol>
        <CustomCol path="/AddEmp" text={"Add Employee"}>
          <FcBusinessman size='4rem' />
        </CustomCol>
      </Wrap>
    </>
  );
}
