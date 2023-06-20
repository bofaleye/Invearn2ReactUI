"use client"

import RequestDemoForm, { RequestDemoFormProps } from '@/app/forgot-password/securities/RequestDemoForm';
import { initModals } from 'flowbite';
import React from 'react';

export interface RequestDemoModalProps extends RequestDemoFormProps{
}

const RequestDemoModal: React.FC<RequestDemoModalProps> = (props)=>{

    // Effet
    React.useEffect(()=>{
        initModals();
    },[]);

    return(
        <div
            id="request-demo-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
            <div className="relative w-full max-w-md max-h-full">
                
                {/* Modal content */}
                <RequestDemoForm {...props}/>
            </div>
        </div>

    )
}
export default RequestDemoModal