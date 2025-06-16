import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Group } from 'three';

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

function ProjectModel({ modelPath, scale, onLoaded }: { modelPath?: string; scale?: number; onLoaded: () => void }) {
  // 模型加载
  const { scene, animations } = useGLTF(modelPath || '', true);
  const { actions } = useAnimations(animations, scene);

  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction?.play();
    }
    // 模型加载完毕后通知父组件
    onLoaded();
    // eslint-disable-next-line
  }, [actions]);

  return <primitive object={scene as Group} scale={scale} />;
}

const ProjectShowcaseCanvas: React.FC<ProjectShowcaseCanvasProps> = ({ project, index, handleReset, controlsRefs }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // 只有 Canvas 和模型都加载完毕后才渲染内容
  const show3D = modelLoaded && canvasReady;

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* SVG 加载动画，只有 3D 全部加载完毕后才隐藏 */}
      {!show3D && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-yellow-50 animate-pulse min-h-[200px]">
          <svg className="animate-spin h-10 w-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </div>
      )}
      <Canvas
        className="w-full h-full"
        camera={{ position: project.cameraPosition || [-4.5, 1.5, 6], fov: project.cameraFov || 50 }}
        onCreated={() => setCanvasReady(true)}
      >
        <color attach="background" args={[project.backgroundColor || '#FFF9E3']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={700} />
        <Suspense fallback={null}>
          <ProjectModel modelPath={project.modelPath} scale={project.scale || 1} onLoaded={() => setModelLoaded(true)} />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          target={project.cameraTarget || [-4.5, 0, 0]}
          ref={(ref) => {
            controlsRefs.current[index] = ref;
          }}
          onEnd={() => handleReset(controlsRefs.current[index], project)}
        />
      </Canvas>
    </div>
  );
};

export default ProjectShowcaseCanvas; 