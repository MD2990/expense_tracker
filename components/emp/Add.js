import React from "react";
import {
  CustomField,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "../comUtil/ComUtil";
import { Form, Formik } from "formik";
import { post } from "../../utils/dbConnect";
import { useRouter } from "next/router";
import { Wrap, Center } from "@chakra-ui/react";
import { empValidationSchema } from "../../lib/constants";
import { today } from "../../lib/helpers";

export default function Add() {
  const router = useRouter();

  async function addEmp(values) {
    await post({ url: "emp/add", values });
  }

  return (
    <Formik
      initialValues={{
        emp_name: "",
        job: "",
        civil_id: "",
        passport_number: "",
        empl_Date: today(),
        notes: "No Notes",
      }}
      onSubmit={async (values, actions) => {
        await addEmp(values);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
      validationSchema={empValidationSchema}
    >
      {(props) => {
        return (
          <>
            <Title title="Add New Employee" mt="8%" />
            <Form>
              <Center>
                <Wrap
                  maxW="6xl"
                  spacing="30px"
                  align="center"
                  justify="center"
                  mx="8"
                  borderRadius="lg"
                  p={8}
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
              <FormBottomButton router={router} props={props} />
            </Form>
          </>
        );
      }}
    </Formik>
  );
}
