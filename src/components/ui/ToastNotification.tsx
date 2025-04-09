import { Toast } from "flowbite-react";

interface ToastNotificationProps {
  message: string;
  type: "success" | "warning" | "error";
}

export default function ToastNotification({ message, type }: ToastNotificationProps) {
  const colors = {
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <Toast className={`${colors[type]} border`}>
      {message}
    </Toast>
  );
}
