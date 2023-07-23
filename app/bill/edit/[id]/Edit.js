"use client";
import React from "react";
import {
  CustomDropdown,
  CustomField,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "@components/comUtil/ComUtil";
import { Field, Form, Formik } from "formik";
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
import { handleDelete, handlePut } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import { handleFormDelete } from "@lib/helpers";
import { validationSchema } from "@lib/constants";

export default function Edit_Delete_Bill({ bill }) {
  const router = useRouter();
  const toast = useToast();

  const {
    _id,
    company_name,
    bill_number,
    bill_date,
    bill_type,
    bill_amount,
    payment_status,
    check_date,
    notes,
  } = bill || {};

  async function put(values) {
    try {
      console.log(_id);
      await handlePut({
        values,
        url: `http://localhost:3000/bill/edit/api?id=${_id}`,
        type: `Bill No. ${bill_number} `,
        toast,
        id: _id,
      });
      router.back();
    } catch (error) {
      console.log(error);
    }
  }

  async function FormDeleteFunc() {
    await handleFormDelete({
      deleteUrl: "bill/del",
      id: _id,
      handleDelete,
      router,
    });
  }

  return (
    <>
      <Formik
        initialValues={{
          _id,
          company_name,
          bill_number,
          bill_date: [bill_date].join("/"),
          bill_type,
          bill_amount,
          payment_status,
          check_date,
          notes,
        }}
        onSubmit={async (values, actions) => {
          await put(values);
          actions.setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { values } = props;

          return (
            <Form>
              <Title title={` Update bill no. ${bill.bill_number}`} />
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
                  <CustomField
                    fieldName="bill_number"
                    labelName="Bill Number"
                  />
                  <CustomField
                    fieldName="bill_date"
                    labelName="Bill Date"
                    type="date"
                  />

                  <CustomDropdown fieldName="bill_type" labelName="Bill Type">
                    <option>Cash</option>
                    <option>Cheque</option>
                  </CustomDropdown>

                  <CustomField
                    fieldName="bill_amount"
                    labelName="Bill Amount"
                  />
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

                  <CustomField
                    fieldName="check_date"
                    labelName="Check Date"
                    type="date"
                  />
                  <CustomTextArea fieldName="notes" labelName="Notes" />
                </Wrap>
              </Center>

              <FormBottomButton
                router={router}
                props={props}
                deleteBtn={true}
                deleteFunc={FormDeleteFunc}
              ></FormBottomButton>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
