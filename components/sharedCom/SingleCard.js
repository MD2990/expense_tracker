import { AddIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Center,
  Heading,
  Text,
  WrapItem,
  HStack,
} from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IconButton } from "@chakra-ui/react";
import { setItem } from "../../lib/helpers";
export const AllText = ({ color = "whiteAlpha.900", title, data }) => (
  <Text pb="0.5" color={color}>
    <Text pr="1" as="span" fontWeight="medium" color="whiteAlpha.700">
      {title}
    </Text>
    {data}
  </Text>
);

export default function SingleCard({
  addSalary = false,
  deleteFunction,
  showSalary = false,
  deleteObject = true,

  link,
  children,
  _id,
  color = "gray.300",
  header,
}) {
  const router = useRouter();

  return (
    <WrapItem
      alignItems="center"
      whiteSpace="nowrap"
      background="blackAlpha.800"
      boxShadow="dark-lg"
      rounded="2xl"
    >
      <Center m="2" p="2" cursor="pointer" mr="-1">
        <HStack spacing="4">
          <Tooltip
            label="Edit"
            placement="bottom-start"
            hasArrow
            bg="transparent"
          >
            <Text as="span">
              <AiOutlineEdit
                color="#f0e6eb"
                size="1.5rem"
                onClick={() => router.push(link)}
              />
            </Text>
          </Tooltip>

          {addSalary && (
            <Tooltip
              label="Add Salary"
              placement="bottom-start"
              hasArrow
              bg="transparent"
            >
              <IconButton
                variant="unstyled"
                aria-label="Search database"
                icon={<AddIcon />}
                color="green.300"
                size="1.5rem"
                onClick={() => {
                  setItem("id", _id);
                  setItem("emp", header);

                  router.push(`/${_id}/AddSalary`);
                }}
              />
            </Tooltip>
          )}
          {showSalary && (
            <Tooltip
              label="Show Salaries"
              placement="bottom-start"
              hasArrow
              bg="transparent"
            >
              <IconButton
                variant="unstyled"
                aria-label="Show Salaries"
                icon={<ViewIcon />}
                color="blue.300"
                size="1.5rem"
                onClick={() => {
                  setItem("id", _id);
                  setItem("emp", header);
                  router.push(`/${_id}/ShowEmpSalPage`);
                }}
              />
            </Tooltip>
          )}

          {deleteObject && (
            <Tooltip
              label="Delete"
              placement="bottom-start"
              hasArrow
              bg="transparent"
            >
              <IconButton
                variant="unstyled"
                aria-label="Search database"
                icon={<DeleteIcon />}
                color="red.300"
                size="1.5rem"
                onClick={deleteFunction}
              />
            </Tooltip>
          )}
        </HStack>
      </Center>
      <Accordion defaultIndex={[1]} allowMultiple="false" rounded="lg">
        <AccordionItem border="none">
          <Heading>
            <AccordionButton
              _hover={{ boxShadow: "none" }}
              _focus={{ boxShadow: "none" }}
            >
              <Box flex="1" textAlign="left">
                <Text
                  p="4"
                  textAlign="center"
                  fontSize="xl"
                  color="whiteAlpha.900"
                  fontWeight="bold"
                >
                  {header}
                </Text>
              </Box>
              <AccordionIcon color={color} fontSize="3xl" />
            </AccordionButton>
          </Heading>

          <AccordionPanel pb={4}>{children}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </WrapItem>
  );
}
