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
import { Post } from "@utils/dbConnect";
import { Wrap, Center, useToast } from "@chakra-ui/react";
import { empValidationSchema } from "@lib/constants";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function AddEmp() {
  const date = format(new Date(), "yyyy-MM-dd");
  const toast = useToast();
  const router = useRouter();

  async function add(values) {
    try {
      await Post({ url: "/emp/add/api", values, toast, type: "Employee" });
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: "Unable to add employee.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Formik
      initialValues={{
        emp_name: "",
        job: "",
        civil_id: "",
        passport_number: "",
        empl_Date: date,
        notes: "No Notes",
      }}
      onSubmit={async (values, actions) => {
        await add(values);
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
                  <CustomDateField
                    fieldName="empl_Date"
                    labelName="Employment Date"
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
