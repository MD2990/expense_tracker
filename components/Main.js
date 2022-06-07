import {
  FcBusinessman,
  FcCollaboration,
  FcInspection,
  FcBullish,
  FcAcceptDatabase,
  FcKindle,
} from "react-icons/fc";

import Link from "next/link";
import {
  Center,
  StackDivider,
  Text,
  Wrap,
  WrapItem,
  Box,
  HStack,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";

const LinkPath = ({ path, text }) => (
  <Link href={path}>
    <a>
      <UnorderedList
        px="2"
        fontSize={["sm", "md", "lg", "2xl", "3xl"]}
        fontWeight="bold"
        textAlign="left"
        fontFamily="serif"
        color="blue.300"
      >
        <ListItem
          _hover={{
            color: "blue.600",
            transition: "all 0.4s ease-in-out",
          }}
        >
          {text}
        </ListItem>
      </UnorderedList>
    </a>
  </Link>
);

export function CustomCol({ children, title }) {
  return (
    <WrapItem
      shadow="inner"
      flexDirection={"column"}
      fontSize={["sm", "md", "lg"]}
      rounded="xl"
    >
      <Text
        p="2"
        color={"powderblue"}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        alignSelf="center"
        fontWeight="bold"
        textAlign="center"
        fontFamily="serif"
        fontSize={["md", "lg", "2xl", "5xl", "7xl"]}
      >
        {title}
      </Text>

      <Box
        p="3"
        rounded={"xl"}
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        flexDir={"column"}
      >
        {children}
      </Box>
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
          color="tan"
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
        <CustomCol title={"Bills"}>
          <LinkPath path="/ShowBill" text="Show Bills" />
          <LinkPath path="/AddBill" text="Add Bill" />
        </CustomCol>

        <CustomCol title={"Expenses"}>
          <LinkPath path="/ShowExp" text="Show Expenses" />
          <LinkPath path="/AddExp" text="Add Expense" />
        </CustomCol>
        <CustomCol title={"Employees"}>
          <LinkPath path="/ShowEmp" text="Show Employees" />
          <LinkPath path="/AddEmp" text="Add Employee" />
        </CustomCol>
      </Wrap>
    </>
  );
}
