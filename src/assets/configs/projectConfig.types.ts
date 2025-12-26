export type ToolStatus = 'active' | 'comingSoon' | 'planned' | 'deprecated';
export type ToolCategory = 'conversion' | 'geometry' | 'health' | 'finance' | 'time' | 'math' | 'all';

export interface Tool {
  icon: string;
  title: string;
  path: string;
  description: string;
  status: ToolStatus;
  category: ToolCategory;
  keywords: string[];
  popularity?: number;
  lastUpdated?: string;
  estimatedRelease?: string;
}

export interface ProjectConfig {
  project: {
    name: string;
    description: string;
    status: {
      title: string;
      message: string;
      phase: string;
      version: string;
    };
  };

  features: {
    available: {
      title: string;
      description: string;
      sectionIcon: string;
    };
    upcoming: {
      title: string;
      description: string;
      sectionIcon: string;
    };
    planned: {
      title: string;
      description: string;
      sectionIcon: string;
    };
  };

  technologies: {
    title: string;
    description: string;
    categories: {
      [key: string]: {
        title: string;
        items: Array<{
          name: string;
          icon: string;
          description: string;
        }>;
      };
    };
  };

  projectBenefits: {
    title: string;
    description: string;
    benefits: Array<{
      icon: string;
      title: string;
      description: string;
      color: string;
    }>;
  };

  creator: {
    title: string;
    description: string;
    profile: {
      name: string;
      title: string;
      description: string;
      photo: string;
      location: string;
      specialization: string;
    };
    links: {
      development: Array<{
        icon: string;
        title: string;
        description: string;
        link: string;
      }>;
      contact: Array<{
        icon: string;
        title: string;
        description: string;
        link: string;
      }>;
      professional: Array<{
        icon: string;
        title: string;
        description: string;
        link: string;
      }>;
    };
  };

  development: {
    title: string;
    phases: Array<{
      name: string;
      status: string;
      description: string;
      progress: number;
    }>;
  };

  tools: {
    [key: string]: Tool;
  };

  categories: {
    [key: string]: string;
  };

  tooltips: {
    [key: string]: string;
  };

  messages: {
    [key: string]: string;
  };

  sorting?: {
    [key: string]: string;
  };

  keywords: string[];

  copyright: {
    text: string;
    subText: string;
    license: string;
    attribution: string;
  };

  common: {
    backToHome: string;
    pageNotFound: string;
  };
}