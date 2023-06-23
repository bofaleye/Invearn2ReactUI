import * as yup from 'yup';

export const ForgetPasswordFormSchema = yup.object({
    email: yup.string().email("Enter a valid email address")
    .required("Enter a valid email address"),
});

export type ForgetPasswordFormState = yup.InferType<typeof ForgetPasswordFormSchema>;