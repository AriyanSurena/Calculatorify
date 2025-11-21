import { createContext, useContext, useState, type ReactNode } from "react";

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastDuration = 2000 | 4000 | 6000 | 8000;

interface ToastProps {
    type: ToastType;
    duration: ToastDuration;
    message: string;
}

interface ToastContextType {
    toast: ToastProps | undefined;
    setToast: (toast: ToastProps | undefined) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<ToastProps | undefined>(undefined);
    
    return (
        <ToastContext.Provider value={{ toast, setToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};