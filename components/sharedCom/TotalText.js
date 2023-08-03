import { Text } from '@chakra-ui/react'
import React from 'react'

export default function TotalText({ text }) {
  return (
    <Text
      fontSize={["xx-small", "md", "lg", "xl"]}
      maxH={["2rem", "4rem", "8rem", "12rem"]}
      maxW={["2rem", "4rem", "8rem", "12rem"]}
      fontWeight="bold"
      fontFamily="Times"
      color="gray.400"
    >
      {text}
    </Text>
  );
}
