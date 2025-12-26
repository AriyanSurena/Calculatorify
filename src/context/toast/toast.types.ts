export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastDuration = 2000 | 4000 | 6000 | 8000;

export interface ToastProps {
    type: ToastType;
    duration: ToastDuration;
    message: string;
}

export interface ToastContextType {
    toast: ToastProps | undefined;
    setToast: (toast: ToastProps | undefined) => void;
}