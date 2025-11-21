import { useEffect } from "react";
import DynamicIcon from "../SVGIcons/DynamicIcon";
import { useToast } from "../Context/useToast";

/**
 * Types of toast notifications.
 * @enum {string}
 */
type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Props for the Toast component.
 */
interface ToastProps {
    /**
   * The message to display inside the toast.
   */
    message?: string;

    /**
   * Visual style of the toast.
   * @default "success"
   */
    type?: ToastType;

    /**
   * Duration in milliseconds before the toast auto-dismisses.
   * @default 2000
   */
    duration?: number;
}

/**
 * A temporary notification message (toast) that appears for a set duration
 * and then fades out automatically.
 *
 * Supports four visual styles:
 * - `success` – Green background (task completed)
 * - `error` – Red background (operation failed)
 * - `warning` – Yellow background (user caution)
 * - `info` – Blue background (helpful tip)
 *
 * @param props - {@link ToastProps}
 * @returns A toast notification that auto-hides after `duration` ms
 *
 * @example
 * ```tsx
 * <Toast message="Task saved successfully." type="success" />
 * <Toast message="Error communicating with the server." type="error" duration={4000} />
 * ```
 */
const Toast: React.FC<ToastProps> = ({
    message, // An Required String
    // The default value is success.
    type = 'success', // It can also be 'success' | 'error' | 'warning' | 'info'
    duration = 2000 //A number based on milliseconds.
}) => {
    const {toast, setToast} = useToast();
    useEffect(() => {
        const Timer = setTimeout(() => {
            setToast(undefined)
        }, duration);

        return (): void => {
            clearTimeout(Timer);
        }
    }, [duration])

    // Classes that style the component depending on the type present in the props:
    const typeClasses = {
        success: 'bg-green-500 ring-green-800',
        error: 'bg-red-500 ring-red-800',
        warning: 'bg-yellow-500 ring-yellow-800 text-gray-900',
        info: 'bg-blue-500 ring-blue-800',
    };

    // Base (default) component classes:
    const baseClasses = `
        flex flex-row justify-between
        w-11/12 max-w-lg min-h-max max-h-32 p-3 my-2 
        text-white font-medium 
        shadow-xl rounded-lg 
        select-none
        fixed top-4 left-1/2 transform -translate-x-1/2
        md:top-auto md:bottom-4 md:left-4 md:translate-x-0
        z-50
        opac
        ${toast ? 'opacity-100' : 'opacity-0'}
    `;

    // After the duration expires, the toast disappears:
    if (!toast) {
        return null;
    } else {
        return (
            <div
                role="status"
                className={`${baseClasses} ${typeClasses[type]}`}>
                <span>
                    {message}
                </span>
                <span className="block w-max h-max cursor-pointer text-red-700 hover:text-red-600" onClick={() => setToast(undefined)}>
                    <DynamicIcon icon="close" />
                </span>
            </div>
        )
    }
}

export default Toast;