"use client";
import React from "react";
import {
  CustomDateField,
  CustomField,
  CustomTextArea,
  FormBottomButton,
  Title,
} from "@components/comUtil/ComUtil";
import { Form, Formik } from "formik";
import { Wrap, Center, useToast } from "@chakra-ui/react";
import { handleDelete, handlePut } from "@utils/dbConnect";
import { useRouter } from "next/navigation";
import { handleFormDelete } from "@lib/helpers";
import { empValidationSchema } from "@lib/constants";

export default function Edit({ emp }) {
  const router = useRouter();
  const toast = useToast();
  const { _id, emp_name, job, civil_id, passport_number, empl_Date, notes } =
    emp;

  async function put(values) {
    try {
      // get env variable
      const ip = process.env.VERCEL_URL;
      await handlePut({
        values,
        url: `${ip}/emp/edit/api?id=${_id}`,
        type: `${emp_name} `,
        toast,
        id: _id,
      });
      router.back();
    } catch (error) {}
  }

  async function FormDeleteFunc() {
    const ip = process.env.VERCEL_URL;

    // filter out the emp
    await handleFormDelete({
      deleteUrl: `${ip}/emp/show/api?id=${_id}`,
      type: "Employee",
      toast,
      handleDelete,
      router: handleDelete ? router : null,
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
        await put(values);
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
                  <CustomDateField
                    fieldName="empl_Date"
                    labelName="Employment Date"
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
