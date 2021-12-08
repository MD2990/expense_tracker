import React from "react";
import {
  CustomField,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { handlePut, handleDelete } from "../../utils/dbConnect";
import { useRouter } from "next/router";

import { Wrap, Center } from "@chakra-ui/react";
import { empValidationSchema } from "../../lib/constants";
import { handleFormDelete } from "../../lib/helpers";

export default function Edit_Delete_Emp({ emp }) {
  const { _id, emp_name, job, civil_id, passport_number, empl_Date, notes } =
    emp;
  const router = useRouter();

  async function editEmp(values) {
    await handlePut({ url: "emp/update", values, router });

    router.back();
  }

  async function FormDeleteFunc() {
    await handleFormDelete({
      deleteUrl: "emp/del",
      id: _id,
      router,

      handleDelete,
    });
  }
  return (
    <Formik
      initialValues={{
        emp_name,
        job,
        civil_id,
        passport_number,
        empl_Date,
        notes,
      }}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await editEmp(values);
      }}
      validationSchema={empValidationSchema}
    >
      {(props) => {
        return (
          <>
            <Form>
              <Title title={emp_name} mt="5%" />
              <Center>
                <Wrap
                  spacing="30px"
                  align="center"
                  justify="center"
                  maxW="4xl"
                  borderRadius="lg"
                  p={8}
                  mx="8"
                  mt={8}
                  mb="4"
                  shadow="md"
                >
                  <CustomField fieldName="emp_name" labelName="Employee Name" />
                  <CustomField fieldName="job" labelName="Job" />
                  <CustomField fieldName="civil_id" labelName="Civil ID" />
                  <CustomField
                    fieldName="passport_number"
                    labelName="Passport Number"
                  />
                  <CustomField
                    fieldName="empl_Date"
                    labelName="Employment Date"
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
              />
            </Form>
          </>
        );
      }}
    </Formik>
  );
}
