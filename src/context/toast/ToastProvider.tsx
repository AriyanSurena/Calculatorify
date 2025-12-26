import { useState, type ReactNode } from "react";
import type { ToastProps } from "./Toast.types";
import { ToastContext } from "./ToastContext";

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<ToastProps | undefined>(undefined);
    
    return (
        <ToastContext.Provider value={{ toast, setToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export default ToastProvider;