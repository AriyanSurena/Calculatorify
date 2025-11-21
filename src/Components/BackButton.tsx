import { Link } from "react-router-dom"
import DynamicIcon from "../SVGIcons/DynamicIcon"

const BackButton: React.FC<{
    to: string;
    icon: string;
    className?: string;
    title?: string;
    children?: React.ReactNode;
}> = ({
    to,
    icon,
    className,
    title,
    children,
}) => (
        <Link
            to={to}
            className={`group flex select-none items-center gap-2 text-white shadow-lg transition-all duration-300 z-50 p-3 rounded-full md:static bg-white/20 hover:bg-white/30 rounded-lg px-3 py-2 text-current select-none [-webkit-user-drag:none] ${className}`}
            title={title}
        >
            {/* آیکون */}
            <DynamicIcon icon={icon} />
            {children}
        </Link>
    )

export default BackButton;