import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ProjectModel from './ProjectModel';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface Project {
  id: string;
  title: string;
  description: string[];
  technologies: string[];
  modelPath?: string;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  cameraFov?: number;
  backgroundColor?: string;
  scale?: number;
  url?: string;
}

interface ProjectShowcaseCanvasProps {
  project: Project;
  index: number;
  handleReset: (controls: OrbitControlsImpl | null, project: Project) => void;
  controlsRefs: React.MutableRefObject<(OrbitControlsImpl | null)[]>;
}

const ProjectShowcaseCanvas: React.FC<ProjectShowcaseCanvasProps> = ({ project, index, handleReset, controlsRefs }) => {
  return (
    <Canvas className="w-full h-full" camera={{ position: project.cameraPosition || [-4.5, 1.5, 6], fov: project.cameraFov || 50 }}>
      <color attach="background" args={[project.backgroundColor || '#FFF9E3']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={700} />
      <ProjectModel modelPath={project.modelPath} scale={project.scale || 1} />
      <OrbitControls
        enableZoom={false}
        target={project.cameraTarget || [-4.5, 0, 0]}
        ref={(ref) => {
          controlsRefs.current[index] = ref;
        }}
        onEnd={() => handleReset(controlsRefs.current[index], project)}
      />
    </Canvas>
  );
};

export default ProjectShowcaseCanvas; 