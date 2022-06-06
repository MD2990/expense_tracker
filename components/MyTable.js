import React from "react";
import { AddIcon, DeleteIcon, EditIcon, LinkIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Wrap,
  WrapItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

export default function MyTable({
  size = "lg",
  data,
  tableTitle,
  deleteFunc,
  tableHeads,
  tableRows,
  view,
  add,
  addFunc,
  editFunc,
  viewFunc,
  count,
}) {
  const TheTable = () => (
    <>
      <Thead>
        <Tr>
          {tableHeads.map((e, i) => (
            <Th key={i}>{e}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody fontSize={["sm", "md", "lg", "xl"]}>
        {data.map((t, index) => (
          <Tr key={t._id}>
            {tableRows.map((e, i) => (
              <Td key={i} textAlign={"center"}>
                {/* add No field to the table if the field is 0 */}
                {i === 0 && index + 1}

                {t[e]}
                {e === "edit" && (
                  <Link href={editFunc(t)} passHref>
                    <a>
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        variant="unstyled"
                        color={"gray.400"}
                        fontSize={["xl", "2lg", "3xl"]}
                      />
                    </a>
                  </Link>
                )}
                {e === "payment_status" && (t[e] ? "Paid" : "Unpaid")}
                {e === "delete" && (
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon />}
                    onClick={() => deleteFunc(t)}
                    variant="unstyled"
                    color="red.400"
                    fontSize={["xl", "2lg", "3xl"]}
                  />
                )}
                {view && e === "view" && (
                  <Link href={viewFunc(t)} passHref>
                    <a
                      style={{
                        pointerEvents: `${
                          count(t._id) < 1 ? "none" : "auto"
                        }  `,
                        cursor: ` ${
                          count(t._id) < 1 ? "not-allowed" : "pointer"
                        }`,
                      }}
                    >
                      <Text
                        as="button"
                        rounded={"md"}
                        textShadow={"0px 3px 2px white"}
                        border={"solid .2px"}
                        borderRight={"solid 3px"}
                        borderBottom={"solid 3px"}
                        p="2"
                        px="6"
                        userSelect={"none"}
                        fontWeight={900}
                        fontFamily="sans-serif"
                        color={` ${count(t._id) > 0 ? "green" : "red"}`}
                      >
                        {count(t._id)}
                      </Text>
                    </a>
                  </Link>
                )}
                {add && e === "add" && (
                  <Link href={addFunc(t)} passHref>
                    <a>
                      <AddIcon
                        aria-label="Add"
                        icon={<LinkIcon />}
                        variant="unstyled"
                        color={"green.300"}
                        fontSize={["xl", "2lg", "3xl"]}
                      />
                    </a>
                  </Link>
                )}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </>
  );

  return (
    <Wrap justify={"center"} p="2" m="2" mb="4">
      <WrapItem>
        <Table variant="striped" colorScheme="teal" size={size}>
          <TableCaption
            userSelect={"none"}
            placement="top"
            fontSize={["xl", "2xl", "3xl", "5xl"]}
            textDecoration="underline"
            textShadow={`0px 0px 10px #d0d9d2`}
          >
            <Text
              as={"span"}
              textDecoration="underline"
              fontSize={["2xl", "3xl", "4xl"]}
            >
              {tableTitle}
            </Text>
          </TableCaption>

          <TheTable />
        </Table>
      </WrapItem>
    </Wrap>
  );
}
