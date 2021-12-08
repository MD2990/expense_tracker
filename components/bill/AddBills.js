import React from "react";
import {
  CustomDropdown,
  CustomField,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "../comUtil/ComUtil";
import { Field, Form, Formik } from "formik";
import { post } from "../../utils/dbConnect";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Wrap,
  Center,
  WrapItem,
  Switch,
} from "@chakra-ui/react";
import { validationSchema } from "../../lib/constants";
import { useRouter } from "next/router";
import { today } from "../../lib/helpers";

export default function AddBills() {
  const router = useRouter();
  async function add(values) {
    await post({ url: "bill/add", values });
  }

  return (
    <Formik
      initialValues={{
        company_name: "",
        bill_number: "",
        bill_date: today(),
        bill_type: "Cash",
        bill_amount: "",
        payment_status: false,
        check_date: "2000-01-01",
        notes: "",
      }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);

        await add(values);

        actions.resetForm();
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
                <CustomField
                  fieldName="bill_date"
                  labelName="Bill Date"
                  type="date"
                />

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

                <CustomField
                  fieldName="check_date"
                  labelName="Check Date"
                  type="date"
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
