import { createContext } from "react";
import type { LanguagesContextType } from "./Language.types";

export const LanguageContext = createContext<LanguagesContextType | undefined>(undefined);