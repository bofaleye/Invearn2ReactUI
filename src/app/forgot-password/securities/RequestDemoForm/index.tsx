import React from 'react';
import { RequestDemoFormSchema, RequestDemoFormState } from './schema';
import FormInput from '@/components/FormElements/FormInput';
import FormTextArea from '@/components/FormElements/FormTextArea';
import FormButton from '@/components/FormElements/FormButton';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

export interface RequestDemoFormProps{
    onFormSubmit: SubmitHandler<RequestDemoFormState>;
    isLoading?: boolean;
}

const RequestDemoForm: React.FC<RequestDemoFormProps> = ({
    onFormSubmit, isLoading
})=>{

    // Variables
    let initialValues: RequestDemoFormState = {
        name: '',
        email: '',
        question: '',
        message: ''
    }

    // Hooks
    const { handleSubmit, register, watch, setValue, formState: { errors } } = useForm<RequestDemoFormState>({
        resolver: yupResolver(RequestDemoFormSchema),
        defaultValues: initialValues
    })

    // Values
    // const message = watch('message', '');

    // Elements
    const closeButton = (
        <svg 
            aria-hidden="true" 
            className="w-7 h-7" 
            fill="currentColor" 
            viewBox="0 0 20 20" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                fillRule="evenodd" 
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
            </path>
        </svg>
    )

    return(
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    
            {/** Heading */}
            <div className='bg-black rounded-lg flex items-center p-5'>
                <h3 className='text-white text-lg'>
                    Make an enquiry?
                </h3>
                <button
                    type="button"
                    data-modal-hide="request-demo-modal"
                    className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                >
                    { closeButton }
                    <span className="sr-only">Close modal</span>
                </button>
            </div>

            {/** Actual Form */}
            <div className="px-6 py-6 lg:px-8">

                <form className="space-y-6" onSubmit={handleSubmit(onFormSubmit)}>
                    <FormInput
                        id="demo-name"
                        label="Name"
                        placeholder="Enter Name"
                        error={!!errors.name}
                        errorMessage={errors.name?.message}
                        {...register('name')}
                    />
                    <FormInput
                        id="demo-email"
                        label="Email"
                        placeholder='Enter Email'
                        error={!!errors.email}
                        errorMessage={errors.email?.message}
                        {...register('email')}
                    />
                    <FormInput
                        id="demo-question"
                        label="Your Question"
                        placeholder='Greenpole’s Pricing Packages?'
                        error={!!errors.question}
                        errorMessage={errors.question?.message}
                        {...register('question')}
                    />
                    <FormTextArea
                        id="demo-message"
                        label="Message"
                        placeholder='Enter Message'
                        error={!!errors.message}
                        errorMessage={errors.message?.message}
                        onChange={(e)=>{
                            setValue('message', e.target.value, { shouldValidate: true });
                        }}
                    />

                    <FormButton className="bg-brand-200"
                        // onClick={()=> props.handleSubmit()}
                        loading={isLoading}
                    >
                        Send Message
                    </FormButton>
        
                </form>
            </div>
        </div>
    )
}

export default RequestDemoForm;