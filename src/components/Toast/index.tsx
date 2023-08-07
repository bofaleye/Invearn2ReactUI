import { toast } from "react-toastify";

interface ToastProps {
  type: "success" | "error";
  message: string;
  placement: any;
}

export const GpToast = ({ type, message, placement }: ToastProps) => {
  if (type === "success") {
    return toast.success(message, {
      position: placement,
    });
  } else if (type === "error") {
    return toast.error(message, {
      position: placement,
    });
  }
};
