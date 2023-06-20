import * as yup from 'yup';

/**
 * ^ represents the starting of the string.
 * (?=.*[a-z]) represent at least one lowercase character.
 * (?=.*[A-Z]) represents at least one uppercase character.
 * (?=.*\\d) represents at least one numeric value.
 * (?=.[-+_!@#$%^&., ?]) represents at least one special character.
 * . represents any character except line break.
 * {.10,} represents minimum six in length.
 */
let regex = new RegExp('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{10,})');

export const ResetPasswordFormSchema = yup.object({
    password: yup.string().required()
    .matches(regex, "Must Contain 10 Characters, One Uppercase, and One Special Case Character"),

    confirmPassword: yup.string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export type ResetPasswordFormState = yup.InferType<typeof ResetPasswordFormSchema>;