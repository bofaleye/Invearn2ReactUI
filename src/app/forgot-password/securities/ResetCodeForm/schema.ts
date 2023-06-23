import * as yup from 'yup';

export const ResetCodeFormSchema = yup.object({
    pin1: yup.string().required(),
    pin2: yup.string().required(),
    pin3: yup.string().required(),
    pin4: yup.string().required(),
    pin5: yup.string().required(),
    pin6: yup.string().required(),
});

export type ResetCodeFormState = yup.InferType<typeof ResetCodeFormSchema>;