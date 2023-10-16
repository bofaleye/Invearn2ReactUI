import * as Yup from "yup";
 export const newUserSchema = Yup.object({
    userName: Yup.string()
      .min(3, "Input must be  minimum of 3 characters")
      .required("Username field cannot be empty"),
    password: Yup.string()
      .min(8, "Password must be  minimum of 8 characters")
      .required("Password field cannot be empty"),
    description: Yup.string(),
    email: Yup.string().email("Invalid email address").required("Required"),
  });
