import * as yup from "yup";

export const RequestDemoFormSchema = yup.object({
    name: yup.
    string()
    .required('Please enter your name'),
    // "email": "",
    // "organisation": "Testing the organization",
    // "designation": "Testing the designation",
    // "message": "hello",
    email: yup
    .string()
    .email("Enter a valid email address")
    .required("Enter a valid email address"),

    organisation: yup.
    string()
    .required('Please enter your organization'),

    designation: yup.
    string()
    .required('Please enter your designation in the organisation'),

    message: yup
    .string()
    .required("Enter a message"),
  
});

export type RequestDemoFormState = yup.InferType<typeof RequestDemoFormSchema>;
