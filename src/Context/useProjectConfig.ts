import { useLanguage } from "./useLanguage";
import projectConfigEn from "../assets/configs/projectConfig.en.json";
import projectConfigFa from "../assets/configs/projectConfig.fa.json";
import type { ProjectConfig } from "../assets/configs/projectConfig.types";

const useConfig = (): ProjectConfig => {
  const { language } = useLanguage();

  const config = language.includes('en-US')
    ? projectConfigEn as ProjectConfig
    : projectConfigFa as ProjectConfig;

  return config;
};

export { useConfig };