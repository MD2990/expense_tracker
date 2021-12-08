import React from "react";
import { getSum, post } from "../../utils/dbConnect";
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
import { today } from "../../lib/helpers";

export default function Add({ emp,id }) {
  {
    const router = useRouter();

    async function addSalary(values) {
     await post({url:"sal/add", values});
    }


    return (
      <>
        <Title title={` Add Salary for ${emp} `} mt="8%"/>

        <Formik
          initialValues={{
            basic_salary: 0,
            bonus: 0,
            loans: 0,
            total_salary: 0,
            sal_notes: "No Notes",
            salary_date: today(),
            emp_id: id,
          }}
          onSubmit={async (values, actions) => {
            await addSalary(values);
            actions.setSubmitting(false);
            actions.resetForm();
          }}
          validationSchema={salaryValidationSchema}
        >
          {(props) => {
            const { values } = props;

            return (
              <Form>
                <Center>
                  <Wrap
                    maxW="2xl"
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
                <FormBottomButton router={router} props={props} />
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}
