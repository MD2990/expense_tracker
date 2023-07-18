
import { Center, HStack, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { HD } from "../comUtil/ComUtil";

export default function ErrorPage() {
  const router = useRouter();
  const MyText = ({ color, deg, size, text }) => {
    return (
      <Text
        className="hvr hvr-bounce-out"
        overflow="hidden"
        textOverflow="ellipsis"
        as="span"
        fontSize={`${size}rem`}
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
        <HStack
          cursor="pointer"
          spacing="2"
          p="4"
          rounded="2xl"
          onClick={() => router.replace("/")}
        >
          <MyText size="18" color="gray.100" deg="-40" text="S" />
          <MyText size="8" color="gray.200" deg="40" text="O" />
          <MyText size="4" color="gray.300" deg="50" text="M" />
          <MyText size="8" color="gray.400" deg="-50" text="E" />
          <MyText size="1" color="gray.500" deg="60" text="T" />
          <MyText size="5" color="gray.600" deg="-60" text="H" />
          <MyText size="7" color="gray.700" deg="70" text="I" />
          <MyText size="9" color="gray.800" deg="-70" text="N" />
          <MyText size="6" color="gray.900" deg="80" text="G" /> {"   "}
          {"  "}
          <MyText size="9" color="gray.100" deg="-80" text="W" />
          <MyText size="5" color="gray.300" deg="-50" text="E" />
          <MyText size="10" color="gray.500" deg="-50" text="N" />
          <MyText size="3" color="gray.700" deg="30" text="T" /> {"   "}
          {"  "} <MyText size="6" color="gray.200" deg="-10" text="W" />
          <MyText size="2" color="gray.400" deg="-20" text="R" />
          <MyText size="1" color="gray.600" deg="-30" text="O" />
          <MyText size="4" color="gray.800" deg="-40" text="G" />
        </HStack>
      </Center>
    </>
  );
}
