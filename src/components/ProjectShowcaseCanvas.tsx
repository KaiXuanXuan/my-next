import React, { Suspense, useState, useCallback, useMemo } from 'react';
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

function ProjectModel({ modelPath, scale, onLoaded, onError }: { 
  modelPath?: string; 
  scale?: number; 
  onLoaded: () => void;
  onError: () => void;
}) {
  const [loadState, setLoadState] = useState<'loading' | 'loaded' | 'error'>('loading');
  
  // 始终调用所有hooks
  const gltfData = useGLTF(modelPath || '', true);
  const { actions } = useAnimations(gltfData.animations, gltfData.scene);

  // 处理模型加载状态
  React.useEffect(() => {
    try {
      if (gltfData.scene && loadState === 'loading') {
        setLoadState('loaded');
        onLoaded();
      }
    } catch {
      if (loadState !== 'error') {
        setLoadState('error');
        onError();
      }
    }
  }, [gltfData.scene, loadState, onLoaded, onError]);

  // 处理动画
  React.useEffect(() => {
    if (loadState === 'loaded' && actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      firstAction?.play();
    }
  }, [actions, loadState]);

  // 错误状态处理
  React.useEffect(() => {
    if (loadState === 'error') {
      onError();
    }
  }, [loadState, onError]);

  if (loadState === 'error' || !gltfData.scene) {
    return null;
  }

  return <primitive object={gltfData.scene as Group} scale={scale} />;
}

const ProjectShowcaseCanvas: React.FC<ProjectShowcaseCanvasProps> = ({ project, index, handleReset, controlsRefs }) => {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // 缓存回调函数避免重新渲染
  const handleModelLoaded = useCallback(() => {
    setModelLoaded(true);
  }, []);

  const handleModelError = useCallback(() => {
    setHasError(true);
  }, []);

  const handleCanvasCreated = useCallback(() => {
    setCanvasReady(true);
  }, []);

  // 缓存相机配置
  const cameraConfig = useMemo(() => ({
    position: project.cameraPosition || [-4.5, 1.5, 6],
    fov: project.cameraFov || 50
  }), [project.cameraPosition, project.cameraFov]);

  // 只有 Canvas 和模型都加载完毕后才渲染内容
  const show3D = modelLoaded && canvasReady && !hasError;

  if (hasError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 min-h-[200px]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-500 text-sm">3D模型加载失败</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* SVG 加载动画，只有 3D 全部加载完毕后才隐藏 */}
      {!show3D && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 min-h-[200px]">
          <div className="relative z-10">
            <svg className="animate-spin h-12 w-12 text-yellow-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p className="text-yellow-600 text-sm font-medium animate-pulse">3D模型渲染中...</p>
          </div>
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 to-orange-100/20"></div>
          <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-200/30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-6 right-6 w-8 h-8 bg-orange-200/40 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-300/20 rounded-full animate-ping"></div>
        </div>
      )}
      <Canvas
        className="w-full h-full"
        camera={cameraConfig}
        onCreated={handleCanvasCreated}
        gl={{ 
          antialias: false, // 关闭抗锯齿提升性能
          alpha: true,
          powerPreference: "high-performance" // 使用高性能GPU
        }}
        dpr={Math.min(window.devicePixelRatio, 2)} // 限制设备像素比，提升性能
      >
        <color attach="background" args={[project.backgroundColor || '#FFF9E3']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={700} />
        <Suspense fallback={null}>
          <ProjectModel 
            modelPath={project.modelPath} 
            scale={project.scale || 1} 
            onLoaded={handleModelLoaded}
            onError={handleModelError}
          />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          target={project.cameraTarget || [-4.5, 0, 0]}
          ref={(ref) => {
            controlsRefs.current[index] = ref;
          }}
          onEnd={() => handleReset(controlsRefs.current[index], project)}
          enableDamping={true} // 添加阻尼效果，更流畅
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
};

export default ProjectShowcaseCanvas; 