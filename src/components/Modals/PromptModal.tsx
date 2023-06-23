"use cleint";

import { Modal } from "flowbite-react";
import { RiErrorWarningLine } from "react-icons/ri";
import AppButton from "../Button";
import { useState } from "react";

export default function PromptModal({}) {
  const [openPromptModal, setOpenPromptModal] = useState(false);
  return (
    <Modal
      size="sm"
      dismissible
      popup
      show={openPromptModal}
      onClose={() => setOpenPromptModal(!openPromptModal)}
    >
      <Modal.Body className="h-[300px] p-4 flex  items-center justify-center">
        <div className=" flex flex-col justify-around items-center text-center">
          <p>
            <RiErrorWarningLine color="red" />
          </p>
          <p>Are you sure you want to delete this user?</p>
          <div className=" w-full flex justify-between mt-4 mb-4">
            <AppButton
              text="Cancel"
              appButtonType="grey-button"
              buttonWidth="w-[45%]"
              buttonClick={() => setOpenPromptModal(!openPromptModal)}
            />

            <AppButton
              text="Yes, Delete"
              appButtonType="red-button"
              buttonWidth="w-[45%]"
              buttonClick={() => setOpenPromptModal(!openPromptModal)}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
