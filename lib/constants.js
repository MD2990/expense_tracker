import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  company_name: Yup.string().trim().required("Company name is required"),
  bill_number: Yup.string().trim().required("Bill Number is required"),
  bill_type: Yup.string().trim().required("Bill Type is required"),
  /*   bill_amount: Yup.number()
    .typeError("Bill should be in digits only")
    .required("Bill amount is required"), */

  bill_amount: Yup.string().trim().required("Bill amount is required"),
  bill_date: Yup.string().trim().required("Bill date is required"),
  check_date: Yup.string().trim().required("Check date is required"),
});

export const expValidationSchema = Yup.object().shape({
  day_sell: Yup.string()
  .required("Daily Sell is required"),
  shop_exp: Yup.string()
    /*   .min(1, "Shop Expenses must be greater than or equal to 1")
    .typeError("Shop Expenses should be in digits only") */
    .required("Shop Expenses is required"),

  deposed_amount: Yup.string()

    /*  .typeError("Deposed Amount should be in digits only") */
    .required("Deposed Amount is required"),

  other_exp: Yup.string()
    /*    .min(1, "Other Expenses must be greater than or equal to 1")
    .typeError("Other Expenses should be in digits only") */
    .required("Other Expenses is required"),
  exp_date: Yup.string().trim().required("Date is required"),
});

const colors = { c1: "#140005", c2: "#464033", c3: "#7E7C73", c4: "#BBC4C2" };

export const empValidationSchema = Yup.object().shape({
  emp_name: Yup.string().trim().required("Employee name is required"),
  job: Yup.string().trim().required("Job is required"),
  civil_id: Yup.string().required("Civic ID is required"),
  passport_number: Yup.string().trim().required("Passport Number is required"),
  empl_Date: Yup.string().required("Employment date is required"),
});
export default colors;
