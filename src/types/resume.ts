export interface Project {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  year: number;
  modelType: 'cube' | 'sphere' | 'torus' | 'custom';
  modelConfig: {
    color?: string;
    size?: number;
    speed?: number;
    metalness?: number;
    roughness?: number;
    modelUrl?: string;
  };
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
} 