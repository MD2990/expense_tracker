"use client";
import React from "react";
import {
  CustomDateField,
  CustomDropdown,
  CustomField,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "@components/comUtil/ComUtil";
import { Field, Form, Formik } from "formik";
import { Post } from "@utils/dbConnect";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Wrap,
  Center,
  WrapItem,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { validationSchema } from "@lib/constants";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function AddBills() {
  const date = format(new Date(), "yyyy-MM-dd");
  const toast = useToast();
  const router = useRouter();

  async function add(values) {
    try {
      await Post({ url: "/bill/add/api", values, toast, type: "Bill" });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to add bill.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Formik
      initialValues={{
        company_name: "",
        bill_number: "",
        bill_date: date,
        bill_type: "Cash",
        bill_amount: "",
        payment_status: false,
        check_date: date,
        notes: "",
      }}
      onSubmit={async (values, actions) => {
        try {
          actions.setSubmitting(true);
          await add(values);
          actions.resetForm();
        } catch (error) {
          toast({
            title: "An error occurred.",
            description: "Unable to add bill.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }}
      validationSchema={validationSchema}
    >
      {(props) => {
        const { values } = props;

        return (
          <Form>
            <Title title="Add New Bill" />
            <Center>
              <Wrap
                maxW="55rem"
                shadow="dark-lg"
                rounded="lg"
                p="4"
                m="4"
                justify="left"
                align="flex-end"
                spacing="40px"
              >
                <CustomField
                  fieldName="company_name"
                  labelName="Company Name"
                />
                <CustomField fieldName="bill_number" labelName="Bill Number" />
                <CustomDateField fieldName="bill_date" labelName="Bill Date" />

                <CustomDropdown fieldName="bill_type" labelName="Bill Type">
                  <option>Cash</option>
                  <option>Cheque</option>
                </CustomDropdown>

                <CustomField fieldName="bill_amount" labelName="Bill Amount" />
                <WrapItem>
                  <Field name="payment_status">
                    {({ field, form }) => (
                      <FormControl
                        shadow="base"
                        p="2.5"
                        pb="-2"
                        rounded="xl"
                        display="flex"
                        alignItems="right"
                        isInvalid={
                          form.errors.payment_status &&
                          form.touched.payment_status
                        }
                      >
                        <FormLabel
                          fontSize="larger"
                          fontWeight="black"
                          htmlFor="payment_status"
                        >
                          {values.payment_status ? "Paid" : "UnPaid"}{" "}
                        </FormLabel>
                        <Switch
                          mt="1.5"
                          colorScheme="whatsapp"
                          {...field}
                          id="payment_status"
                          size="md"
                          isChecked={values.payment_status}
                        />

                        <FormErrorMessage>
                          {form.errors.payment_status}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </WrapItem>

                <CustomDateField
                  fieldName="check_date"
                  labelName="Check Date"
                />

                <CustomTextArea fieldName="notes" labelName="Notes" />
              </Wrap>
            </Center>

            <FormBottomButton router={router} props={props} />
          </Form>
        );
      }}
    </Formik>
  );
}
