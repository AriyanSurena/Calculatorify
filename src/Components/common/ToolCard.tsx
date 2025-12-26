import useLanguage from "./../../hooks/useLanguage";

interface ToolCardProps {
    id: string;
    children: React.ReactNode
} 
type ToolCardType = React.FC<ToolCardProps>

const ToolCard: ToolCardType = ({
    id,
    children
}) => {
    const {language} = useLanguage();
        
        return (
            <article
                id={id}
                className={`
                    flex flex-col gap-4 
                    w-11/12 max-w-lg 
                    p-2 
                    bg-gradient-to-r from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900
                    text-black dark:text-white 
                    shadow-2xl 
                    ring-1 ring-gray-300 dark:ring-gray-800
                    rounded-md relative
                `}
                style={language === 'en-US' ? { direction: "ltr", textAlign:"left" } : {direction: "rtl", textAlign:"right"}}>
                {children}
            </article>
        )
    }

export default ToolCard;