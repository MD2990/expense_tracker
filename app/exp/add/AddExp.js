"use client";
import React from "react";
import {
  CustomDateField,
  CustomField,
  CustomFieldWithValue,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "@components/comUtil/ComUtil";
import { Form, Formik } from "formik";
import { addCurrency, Post } from "@utils/dbConnect";
import { Wrap, Center, useToast } from "@chakra-ui/react";
import { expValidationSchema } from "@lib/constants";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function AddExp() {
  const date = format(new Date(), "yyyy-MM-dd");
  const toast = useToast();
  const router = useRouter();

  async function add(values) {
    try {
      await Post({ url: "/exp/add/api", values, toast, type: "Expense" });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to add expense.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Formik
      initialValues={{
        day_sell: 0,
        shop_exp: 0,
        other_exp: 0,
        total_sell: 0,
        deposed_amount: 0,
        exp_date: date,
        notes: "",
      }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await add(values);
        actions.resetForm();
      }}
      validationSchema={expValidationSchema}
    >
      {(props) => {
        const { values } = props;

        return (
          <Form>
            <Title title="Add Expense" />

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
                  fieldName="day_sell"
                  labelName="Daily Sell"
                  type="number"
                />
                <CustomField
                  fieldName="shop_exp"
                  labelName="Shop Expenses"
                  type="number"
                />
                <CustomField
                  fieldName="other_exp"
                  labelName="Other Expenses"
                  type="number"
                />
                <CustomFieldWithValue
                  fieldName="total_sell"
                  labelName="Total Sell"
                  value={addCurrency(
                    values.day_sell,
                    values.shop_exp,
                    values.other_exp
                  )}
                />

                <CustomField
                  fieldName="deposed_amount"
                  labelName="Deposed Amount"
                  type="number"
                />
                <CustomDateField fieldName="exp_date" labelName="Date" />
                <CustomTextArea fieldName="notes" labelName="Notes" />
              </Wrap>
            </Center>

            <FormBottomButton router={router} props={props}></FormBottomButton>
          </Form>
        );
      }}
    </Formik>
  );
}
