"use client";
import React from "react";
import {
  CustomField,
  CustomFieldWithValue,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "@components/comUtil/ComUtil";
import { Form, Formik } from "formik";
import { Wrap, Center, useToast } from "@chakra-ui/react";
import { addCurrency, handleDelete, handlePut } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import { handleFormDelete } from "@lib/helpers";
import { expValidationSchema } from "@lib/constants";

export default function Edit({ exp }) {
  const router = useRouter();
  const toast = useToast();

  const {
    _id,
    day_sell,
    shop_exp,
    other_exp,
    total_sell,
    deposed_amount,
    exp_date,
    notes,
  } = exp || {};

  async function put(values) {
    try {
      // get env variable
      const ip = process.env.NEXT_PUBLIC_IP;
      await handlePut({
        values,
        url: `${ip}/exp/edit/api?id=${_id}`,
        type: `Expense No. ${_id.substring(16)} `,
        toast,
        id: _id,
      });
      router.back();
    } catch (error) {}
  }

  async function FormDeleteFunc() {
    const ip = process.env.NEXT_PUBLIC_IP;

    // filter out the exp
    await handleFormDelete({
      deleteUrl: `${ip}/exp/show/api?id=${_id}`,
      type: "Expense",
      toast,
      handleDelete,
      router: handleDelete ? router : null,
    });
  }

  return (
    <Formik
      initialValues={{
        day_sell,
        shop_exp,
        other_exp,
        total_sell,
        deposed_amount,
        exp_date,
        notes,
      }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);

        await put(values);
      }}
      validationSchema={expValidationSchema}
    >
      {(props) => {
        const { values } = props;

        return (
          <Form>
            <Title title={`Edit Expense No. ${_id.substring(16)}`} />
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
                <CustomField fieldName="day_sell" labelName="Daily Sell" />
                <CustomField fieldName="shop_exp" labelName="Shop Expenses" />
                <CustomField fieldName="other_exp" labelName="Other Expenses" />
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
                />
                <CustomField
                  fieldName="exp_date"
                  labelName="Date"
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
  );
}
