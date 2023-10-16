import * as Yup from "yup";
 export const newCustomerSchema = Yup.object({
    firstname: Yup.string()
      .min(3, "Input must be  minimum of 3 characters")
      .required("First Name field empty"),
    lastname: Yup.string()
      .min(3, "Input must be  minimum of 3 characters")
      .required("Last Name field empty"),
    middlename: Yup.string()
      .min(3, "Input must be  minimum of 3 characters")
      .required("Middle Name field empty"),
    email: Yup.string().email("Invalid email address").required("Required"),
    dateOfBirth: Yup.string().required("Date of birth field empty"),
    role: Yup.string().required("Role is empty"),
    gender: Yup.string().oneOf(["male", "female"]).required("Gender field empty"),
  });
