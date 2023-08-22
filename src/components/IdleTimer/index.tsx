"use client";
import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import {
  IdleTimerProvider,
  useIdleTimerContext,
} from "react-idle-timer";
import { RiErrorWarningLine } from "react-icons/ri";
import Button from "../Button";
import { useRouter } from 'next/navigation'
const timeout = 1000 * 60 * 5;
const promptBeforeIdle = 1000 * 60;
const IdleTimerWrapper = ({ children }: { children: React.ReactNode }) => {
  const route = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  

  const onPrompt = () => {
    setOpen(true)
  }
  const onActive = () => {
    setOpen(false)
  }

  const onIdle = () =>{
      route.push("/");
  }

  return (
    <IdleTimerProvider
      timeout={timeout}
      promptBeforeIdle={promptBeforeIdle}
      throttle={500}
      onPrompt={onPrompt}
      onIdle={onIdle}
      onActive={onActive}
    >
      {children}
      <IdleTimePrompt open={open} />
    </IdleTimerProvider>
  );
};

export default IdleTimerWrapper;


const IdleTimePrompt = ({ open}: {open: boolean}) =>{
    const [remaining, setRemaining] = useState<number>(0)

   const { activate, getRemainingTime } = useIdleTimerContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000))
    }, 500)

    return () => {
      clearInterval(interval)
    }
  })
    const handleOnclose = () =>{
        activate();
    }
    return(
        <Modal
          size="sm"
          dismissible
          popup
          show={open}
          onClose={handleOnclose}
        >
          <Modal.Body className="h-[300px] mt-4 p-4 flex  items-center justify-center">
            <div className=" flex flex-col justify-around items-center text-center">
              <p>
                <RiErrorWarningLine color="red" />
              </p>
              <p className="font-medium text-lg mt-4 text-black">Are still here?</p>
              <p>{`You will be logged out in ${remaining} seconds` }</p>
              <div className=" w-full flex justify-center mt-4 mb-4">
                <Button
                    appButtonType="green-button"
                    className="w-[70%]"
                    onClick={activate}
                    disabled={false}
                  >still here</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      );
}