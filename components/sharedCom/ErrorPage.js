import { Center, Wrap, Text, Box } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { HD } from "../comUtil/ComUtil";

export default function ErrorPage() {
  const router = useRouter();
  const MyText = ({ color, deg, text }) => {
    return (
      <Text
        _hover={{
          color: "red.300",
          transform: `rotate(${5}deg)`,
          transition: "all 0.5s ease-in-out",

          transformOrigin: "center",
        }}
        className="hvr hvr-bounce-out"
        overflow="hidden"
        textOverflow="ellipsis"
        noOfLines={1}
        as="span"
        fontSize={["sm", "2xl", "5xl", "8xl"]}
        fontWeight="bold"
        color={color}
        transform={`rotate(${deg}deg)`}
      >
        {text}
      </Text>
    );
  };
  return (
    <>
      <HD text="Error" />
      <Center mt="10%" mx="2%">
        <Wrap
          cursor="pointer"
          spacing="2"
          p="4"
          rounded="2xl"
          onClick={() => router.replace("/")}
          direction={["column", "column", "row", "row"]}
          justify={"center"}
        >
          <MyText color="red.700" deg="-40" text="S" />
          <MyText color="red.700" deg="40" text="O" />
          <MyText color="red.700" deg="50" text="M" />
          <MyText color="red.700" deg="-50" text="E" />
          <MyText color="red.700" deg="60" text="T" />
          <MyText color="red.700" deg="-60" text="H" />
          <MyText color="red.700" deg="70" text="I" />
          <MyText color="red.700" deg="-70" text="N" />
          <MyText color="red.700" deg="80" text="G" />

          <Box mx={[1,2,3,4]} />

          <MyText color="red.400" deg="-80" text="W" />
          <MyText color="red.400" deg="-50" text="E" />
          <MyText color="red.400" deg="-50" text="N" />
          <MyText color="red.400" deg="30" text="T" />
          <Box mx="2" />
          <MyText color="red.100" deg="-10" text="W" />
          <MyText color="red.100" deg="-20" text="R" />
          <MyText color="red.100" deg="-30" text="O" />
          <MyText color="red.100" deg="-40" text="G" />
        </Wrap>
      </Center>
    </>
  );
}
