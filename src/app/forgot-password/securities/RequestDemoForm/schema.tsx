import * as yup from 'yup';

/**
 * ^ represents the starting of the string.
 * (?=.*[a-z]) represent at least one lowercase character.
 * (?=.*[A-Z]) represents at least one uppercase character.
 * (?=.*\\d) represents at least one numeric value.
 * (?=.[-+_!@#$%^&., ?]) represents at least one special character.
 * . represents any character except line break.
 * {.6,} represents minimum six in length.
 */
let regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');

export const RequestDemoFormSchema = yup.object({
    name: yup.string().required("Please enter a your name"),

    email: yup.string().email("Enter a valid email address")
    .required("Enter a valid email address"),

    question: yup.string().required("Please enter a question"),
    message: yup.string().required("Please enter a message"),
});

export type RequestDemoFormState = yup.InferType<typeof RequestDemoFormSchema>;