import { useEffect, useState } from "react";
import { useLanguage } from "./useLanguage";

const useContentConfig = <T>(en_US: T, fa_IR: T) => {
    const { language } = useLanguage();
    const [content, setContent] = useState<T>(en_US);
    useEffect(() => {
        switch (language) {
            case "en-US": {
                setContent(en_US)
            } break;
            case "fa-IR": {
                setContent(fa_IR)
            } break;
        }
    }, [language, en_US, fa_IR])
    return content;
}

export default useContentConfig;