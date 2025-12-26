import { createContext } from "react";
import type { LanguagesContextType } from "./language.types";

export const LanguageContext = createContext<LanguagesContextType | undefined>(undefined);