import { Button } from "@chakra-ui/button";
import {
  ArrowBackIcon,
} from "@chakra-ui/icons";
import { Center, Wrap } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";



export const BackButton = ({ ml = "0", mr = "0", mt = "0", mb = "0" }) => {
  const router = useRouter();


  const color = "gray.400";
  return (
    <Button
      className="hvr hvr-backward"
      size="lg"
      fontSize={["xx-small", "md", "lg", "xl"]}
      p={["1", "2", "3", "4"]}
      h={["1.5rem", "2rem", "2.5rem", "3rem"]}
      colorScheme="gray"
      color
      borderColor={color}
      ml={ml}
      mt={mt}
      mb={mb}
      mr={mr}
      leftIcon={<ArrowBackIcon className="hvr hvr-backward" color />}
      onClick={() => router.back()}
    >
      Back
    </Button>
  );
};

export const MainInterface = ({ children }) => (
  <Center>
    <Wrap
      shadow="base"
      rounded="xl"
      my="8"
      justify="center"
      spacing="4"
      mx="4"
      mb="2"
      p="2"
      maxW="8xl"
    >
      {children}
    </Wrap>
  </Center>
);
