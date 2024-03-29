"use client";
import Link from "next/link";
import {
  Center,
  StackDivider,
  Text,
  Wrap,
  WrapItem,
  Box,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React from "react";

const LinkPath = ({ path, text }) => (
  <Link href={path}>
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
  </Link>
);

export function CustomCol({ children, title }) {
  return (
    <WrapItem
      boxShadow="2xl"
      flexDirection={"column"}
      fontSize={["sm", "md", "lg"]}
      rounded="md"
      p="1"
    >
      <Text
        noOfLines="1"
        p="2"
        align="center"
        alignSelf={"center"}
        color={"powderblue"}
        fontWeight="bold"
        textAlign="center"
        fontFamily="serif"
        fontSize={["md", "lg", "2xl", "5xl"]}
        textDecor={"underline"}
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
          textDecor={"underline"}
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
        p={[1, 2, 3, 4]}
        direction={["column", "column", "row"]}
        transition={"all 0.4s ease-in-out"}
        transitionProperty={"all"}
        transitionDuration={"normal"}
        transitionTimingFunction={"ease-in-out"}
      >
        <CustomCol title={"Bills"}>
          <LinkPath path="/bill/show" text="Show Bills" />
          <LinkPath path="/bill/add" text="Add Bill" />
        </CustomCol>

        <CustomCol title={"Expenses"}>
          <LinkPath path="/exp/show" text="Show Expenses" />
          <LinkPath path="/exp/add" text="Add Expense" />
        </CustomCol>
        <CustomCol title={"Employees"}>
          <LinkPath path="/emp/show" text="Show Employees" />
          <LinkPath path="/emp/add" text="Add Employee" />
        </CustomCol>
      </Wrap>
    </>
  );
}
