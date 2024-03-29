"use client";
import React from "react";
import { Field } from "formik";
import colors from "@lib/constants";
import {
  Center,
  Box,
  VStack,
  Button,
  FormErrorMessage,
  FormLabel,
  Input,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Text,
  Wrap,
  FormControl,
  Select,
  Textarea,
  WrapItem,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import Head from "next/head";

export function HD({ text }) {
  return (
    <Head>
      <title>{text}</title>
    </Head>
  );
}

export function Title({ title, mt = "8%", children }) {
  return (
    <Center mt={mt} px="2" mx="2">
      <VStack>
        <Text
          align="center"
          alignSelf={"center"}
          textShadow="1px 2px 2px white"
          textAlign="center"
          noOfLines={1}
          whiteSpace="break-spaces"
          fontSize={["xs", "md", "lg", "2xl", "3xl"]}
          fontFamily="initial"
          color={colors.c3}
          fontWeight={"black"}
          letterSpacing="1.0px"
          rounded="md"
          p={[1, 2, 3, 4]}
          userSelect="none"
          bgGradient={`linear(to-l, white,${colors.c4})`}
        >
          {title}
        </Text>
        {children}
      </VStack>
    </Center>
  );
}

export function PrintBtn({ click }) {
  return (
    <>
      <Button
        variant="outline"
        size="lg"
        _hover={{ boxShadow: "none" }}
        _focus={{ boxShadow: "none" }}
        leftIcon={<CalendarIcon />}
        className="hvr-grow"
        onClick={() => click()}
        colorScheme="gray"
        fontSize={["xx-small", "md", "lg", "xl"]}
        p={["1", "2", "3", "4"]}
        h={["1.5rem", "2rem", "2.5rem", "3rem"]}
      >
        Print
      </Button>
    </>
  );
}

export function Btn({ click, title, icon, color = "blackAlpha" }) {
  return (
    <Button
      _hover={{ boxShadow: "none" }}
      _focus={{ boxShadow: "none" }}
      color={color}
      fontSize={["xx-small", "md", "lg", "xl"]}
      p={["1", "2", "3", "4"]}
      h={["1.5rem", "2rem", "2.5rem", "3rem"]}
      leftIcon={icon}
      className="hvr-grow "
      size={"lg"}
      colorScheme="gray"
      variant="solid"
      onClick={() => click()}
    >
      {title}
    </Button>
  );
}

export function MySkeletons() {
  const colors = { startColor: "gray.50", endColor: "gray.300" };
  const Skeletons = () => (
    <Box padding="6" boxShadow="lg" bg="white" borderRadius="2xl">
      <Skeleton
        height="20px"
        {...colors}
        borderRadius="2xl"
        mb="7"
        mt="2"
        h="8"
      />
      <SkeletonCircle size="12" {...colors} w="44" ml="8" />
      <SkeletonText
        {...colors}
        mt="4"
        noOfLines={6}
        spacing="6"
        h="15rem"
        w="15rem"
      />
    </Box>
  );
  return (
    <Wrap
      justify="center"
      textAlign="center"
      spacing="9"
      mt="10rem"
      ml="auto"
      mr="auto"
    >
      <Skeletons />
      <Skeletons />
      <Skeletons />
    </Wrap>
  );
}

export function SearchInputField({ theValue, onChange }) {
  return (
    <Input
      type={"search"}
      focusBorderColor="gray.400"
      mx="8"
      my="4"
      fontSize={["xs", "sm", "md", "lg"]}
      textAlign="center"
      size={["xs", "sm", "md", "lg"]}
      rounded="full"
      placeholder="Search by any field"
      value={theValue}
      onChange={onChange}
      noOfLines={1}
    />
  );
}

export const CustomField = ({ fieldName, labelName }) => {
  return (
    <WrapItem>
      <Field name={fieldName}>
        {({ field, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel
              color="blackAlpha.700"
              fontSize="larger"
              fontWeight="bold"
              htmlFor={fieldName}
            >
              {labelName}
            </FormLabel>
            <Input
              {...field}
              id={fieldName}
              placeholder={labelName}
              size="lg"
            />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </WrapItem>
  );
};

export const CustomDateField = ({ fieldName, labelName }) => {
  return (
    <WrapItem>
      <Field name={fieldName}>
        {({ field, meta }) => {
          return (
            <FormControl isInvalid={meta.touched && meta.error}>
              <FormLabel
                color="blackAlpha.700"
                fontSize="larger"
                fontWeight="bold"
                htmlFor={fieldName}
              >
                {labelName}
              </FormLabel>

              <Input
                {...field}
                id={fieldName}
                placeholder={labelName}
                size="lg"
                type={"date"}
                pattern="\d{4}-\d{2}-\d{2}"
              />
              <FormErrorMessage>{meta.error}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
    </WrapItem>
  );
};

export const CustomTextArea = ({ fieldName, labelName }) => {
  return (
    <WrapItem>
      <Field name={fieldName}>
        {({ field, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel
              color="blackAlpha.700"
              fontSize="larger"
              fontWeight="bold"
              htmlFor={fieldName}
            >
              {labelName}
            </FormLabel>
            <Textarea
              {...field}
              id={fieldName}
              placeholder={labelName}
              size="lg"
              w="252px"
            />
          </FormControl>
        )}
      </Field>
    </WrapItem>
  );
};

export const CustomDropdown = ({ fieldName, labelName, children }) => {
  return (
    <WrapItem>
      <Field name={fieldName}>
        {({ field, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel
              color="blackAlpha.700"
              fontSize="larger"
              fontWeight="bold"
              htmlFor={fieldName}
            >
              {labelName}
            </FormLabel>
            <Select
              w="252px"
              {...field}
              id="fieldName"
              placeholder="ـــ"
              size="lg"
            >
              {children}
            </Select>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </WrapItem>
  );
};

export const FormBottomButton = ({
  router,
  props,
  deleteBtn = false,
  deleteFunc,
}) => {
  return (
    <Wrap justify="center">
      <Button
        color="yellow.800"
        size="lg"
        colorScheme="gray"
        onClick={() => router.back()}
      >
        Back
      </Button>

      <Button
        color="yellow.800"
        size="lg"
        colorScheme="gray"
        onClick={props.handleReset}
        disabled={!props.dirty}
      >
        Reset
      </Button>
      {deleteBtn && (
        <WrapItem>
          {" "}
          <Button
            size="lg"
            colorScheme="gray"
            color="red.600"
            isLoading={props.isSubmitting}
            type="button"
            onClick={deleteFunc}
          >
            Delete
          </Button>
        </WrapItem>
      )}

      <Button
        size="lg"
        colorScheme="gray"
        isLoading={props.isSubmitting}
        color="yellow.800"
        type="submit"
      >
        Save
      </Button>
    </Wrap>
  );
};

export const CustomFieldWithValue = ({
  fieldName,
  labelName,
  type = "number",
  value,
  disabled = true,
}) => {
  return (
    <WrapItem>
      <Field name={fieldName}>
        {({ field, meta }) => (
          <FormControl isInvalid={meta.touched && meta.error}>
            <FormLabel
              color="blackAlpha.700"
              fontSize="larger"
              fontWeight="bold"
              htmlFor={fieldName}
            >
              {labelName}
            </FormLabel>
            <Input
              isDisabled={disabled}
              {...field}
              id={fieldName}
              placeholder={labelName}
              size="lg"
              type={type}
              value={value}
            />
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </WrapItem>
  );
};
