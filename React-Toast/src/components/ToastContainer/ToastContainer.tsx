import { useRef, useState } from "react";
import "./toastContainer.css";

type TToastType = {
  message: string;
  color: string;
  toastId?: number;
};
const ToastContainer = () => {
  const timerRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const [toasts, setToasts] = useState<TToastType[] | []>([]);
  const handleCloseToast = (toastId: number) => {
    clearTimeout(timerRef.current[toastId]);
    delete timerRef.current[toastId];
    console.log("remove Toast ", timerRef.current);
    setToasts((prevToasts) => {
      const remainingToasts = prevToasts.filter((toast) => {
        return toast.toastId !== toastId;
      });
      return remainingToasts;
    });
  };

  const handleAddToast = ({ message, color }: TToastType) => {
    const toastId = new Date().getTime();
    setToasts((prev) => [...prev, { message, color, toastId }]);
    timerRef.current[toastId] = setTimeout(() => handleCloseToast(toastId), 5000);
    console.log("add Toast ", timerRef.current);
  };
  return (
    <div className="btn-container">
      <div className="flex flex-col gap-2.5 fixed top-4 right-1  w-3xs">
        {toasts.length > 0 &&
          toasts.map((toast: TToastType) => {
            return (
              <div key={toast.toastId} className={`toast p-5 flex items-center justify-between font-semibold ${toast.color}`}>
                {toast.message}{" "}
                <span className="cursor-pointer text-lg font-medium" onClick={() => handleCloseToast(toast.toastId as number)}>
                  x
                </span>
              </div>
            );
          })}
      </div>
      <button
        className="btn"
        onClick={() => {
          handleAddToast({ message: "success", color: "success" });
        }}
      >
        Success Toast
      </button>
      <button
        className="btn"
        onClick={() => {
          handleAddToast({ message: "warning", color: "warn" });
        }}
      >
        Warning Toast
      </button>
      <button
        className="btn"
        onClick={() => {
          handleAddToast({ message: "Info", color: "info" });
        }}
      >
        Info Toast
      </button>
      <button
        className="btn"
        onClick={() => {
          handleAddToast({ message: "Error", color: "error" });
        }}
      >
        Error Toast
      </button>
    </div>
  );
};

export default ToastContainer;
