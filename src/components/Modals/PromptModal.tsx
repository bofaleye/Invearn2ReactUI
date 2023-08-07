"use cleint";

import { Modal, Spinner } from "flowbite-react";
import { RiErrorWarningLine } from "react-icons/ri";
import Button from "../Button";
import { useState } from "react";
import React from "react";

interface PromptModalProps {
  headingText: string;
  bodyText: string;
  isOpen: boolean;
  onClose?: () => void;
  setOpen: () => void;
  OnConfirm: () => void;
  actionLoading: boolean;
}

export default function PromptModal({ bodyText, headingText, setOpen, onClose, isOpen, OnConfirm, actionLoading}: PromptModalProps) {
  
  return (
    <Modal
      size="sm"
      dismissible
      popup
      show={isOpen}
      onClose={onClose}
    >
      <Modal.Body className="h-[300px] mt-4 p-4 flex  items-center justify-center">
        <div className=" flex flex-col justify-around items-center text-center">
          <p>
            <RiErrorWarningLine color="red" />
          </p>
          {/* <p className="font-medium text-lg mt-4 text-black">{headingText}</p> */}
          <p>{bodyText}</p>
          <div className=" w-full flex justify-between mt-4 mb-4">
            <Button
              appButtonType="grey-button"
              className="w-[45%]"
              disabled={actionLoading}
              onClick={setOpen}>Cancel</Button>
        
            <Button
                appButtonType="red-button"
                className="w-[45%]"
                onClick={OnConfirm}
                disabled={actionLoading}
              >{actionLoading && <Spinner color="danger" className="mr-1 w-[1rem] h-[1rem]" />}Yes, Delete</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
