'use client';

import React, { Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Mesh, Group } from 'three';

interface ProjectModelProps {
  modelPath?: string;
  scale?: number;
}

function DefaultModel() {
  const meshRef = React.useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#1890ff" />
    </mesh>
  );
}

function Model({ modelPath, scale }: { modelPath: string, scale?: number }) {
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);

  React.useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];      
      firstAction?.play();
    }
  }, [actions]);

  return <primitive object={scene as Group} scale={scale} />;
}

export default function ProjectModel({ modelPath, scale }: ProjectModelProps) {
  if (!modelPath) {
    return <DefaultModel />;
  }

  return (
    <Suspense fallback={<DefaultModel />}>
      <Model modelPath={modelPath} scale={scale} />
    </Suspense>
  );
} 