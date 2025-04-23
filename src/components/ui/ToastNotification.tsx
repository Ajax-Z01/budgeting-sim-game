import { useEffect, useState } from "react";
import { Toast, ToastToggle } from "flowbite-react";
import { motion } from "framer-motion";

interface ToastNotificationProps {
  message: string;
  type: "success" | "warning" | "error";
  keyProp: number;
}

export default function ToastNotification({ message, type, keyProp }: ToastNotificationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [keyProp, message]);

  const colors = {
    success: "bg-green-100 text-green-800 border-green-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
    error: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <motion.div
      key={keyProp}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.95 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Toast className={`${colors[type]} border shadow-md`}>
        <div className="mx-3 text-sm font-normal">{message}</div>
        <ToastToggle />
      </Toast>
    </motion.div>
  );
}
