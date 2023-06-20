import * as yup from "yup";

export const LoginFormSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Enter a valid email address"),

  password: yup.string().required("Please enter your password"),
});

export type LoginFormState = yup.InferType<typeof LoginFormSchema>;
