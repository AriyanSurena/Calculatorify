import { useContext } from "react";
import type { ToastContextType } from "../context/toast/toast.types";
import { ToastContext } from "../context/toast/toastContext";

const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default useToast;