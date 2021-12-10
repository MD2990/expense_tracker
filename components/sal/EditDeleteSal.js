import React from "react";
import { getSum, handlePut, handleDelete } from "../../utils/dbConnect";
import { useRouter } from "next/router";
import { Center, Wrap } from "@chakra-ui/layout";
import { salaryValidationSchema } from "../../lib/constants";
import { Form, Formik } from "formik";
import {
  CustomField,
  CustomFieldWithValue,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "../comUtil/ComUtil";
import { handleFormDelete } from "../../lib/helpers";

export default function EditDeleteSal({ sal, emp }) {
  {
    const router = useRouter();

    const {
      basic_salary,
      bonus,
      loans,
      total_salary,
      sal_notes,
      salary_date,
      _id,
    } = sal;

    async function editSalary(values) {
      await handlePut({ values, url: "sal/update", router });
      router.back();
    }

    async function FormDeleteFunc() {
      await handleFormDelete({
        deleteUrl: "sal/del",
        id: _id,
        handleDelete,
        router,
      });
    }

    return (
      <>
        <Title title={` Edit ${emp}'s salary `} mt="3%" />

        <Formik
          initialValues={{
            basic_salary,
            bonus,
            loans,
            total_salary,
            sal_notes,
            salary_date,
          }}
          onSubmit={async (values, actions) => {
            await editSalary(values);
            actions.setSubmitting(false);
          }}
          validationSchema={salaryValidationSchema}
        >
          {(props) => {
            const { values } = props;

            return (
              <Form>
                <Center>
                  <Wrap
                    maxW="55rem"
                    shadow="dark-lg"
                    rounded="lg"
                    p="4"
                    m="4"
                    justify="center"
                    align="flex-start"
                    spacing="40px"
                  >
                    <CustomField
                      fieldName="basic_salary"
                      labelName="Basic Salary"
                      type="number"
                    />
                    <CustomField
                      fieldName="bonus"
                      labelName="Bonus"
                      type="number"
                    />
                    <CustomField
                      fieldName="loans"
                      labelName="Loans"
                      type="number"
                    />
                    <CustomFieldWithValue
                      disabled={true}
                      value={getSum(
                        values.basic_salary,
                        values.bonus,
                        values.loans
                      )}
                      fieldName="total_salary"
                      labelName="Total Salary"
                    />

                    <CustomField
                      fieldName="salary_date"
                      labelName="Salary Date"
                      type="date"
                      wi="252px"
                    />

                    <CustomTextArea fieldName="sal_notes" labelName="Notes" />
                  </Wrap>
                </Center>
                <FormBottomButton
                  router={router}
                  props={props}
                  deleteBtn
                  deleteFunc={FormDeleteFunc}
                />
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}
