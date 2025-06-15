'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D模型组件
function ModelScene() {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/pom-pom__blockbench/scene.gltf');
  
  // 递归设置所有 mesh 的 castShadow
  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        (obj as THREE.Mesh).castShadow = true;
      }
    });

    // 沿y轴旋转180度，把模型转到正面
    if (modelRef.current) {
      modelRef.current.rotation.y = Math.PI;
    }
  }, [scene]);
  
  useFrame(() => {
    if (modelRef.current) {
      // 缓慢自动旋转
      modelRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={modelRef} castShadow>
      <primitive 
        object={scene} 
        scale={[1.5, 1.5, 1.5]} 
        position={[0, -2, 0]} 
        castShadow
      />
    </group>
  );
}

export function Avatar3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 移动端降级处理
  if (isMobile) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-orange-400 to-purple-600 rounded-lg flex items-center justify-center text-white text-6xl font-bold shadow-lg">
        👨‍💻
      </div>
    );
  }

  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        shadows
      >
        {/* 背景 */}
        <color attach="background" args={['#f0f0f0']} />
        {/* 地板 */}
        <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#f0f0f0" />
        </mesh>

        {/* 光照设置 */}
        <ambientLight intensity={0.4} />
        <pointLight 
          position={[1, 3.5, 3]} 
          intensity={50}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-bias={-0.005}
          shadow-camera-near={0.5}
          shadow-camera-far={20}
        />
        <directionalLight 
          position={[0, -1, -5]} 
          intensity={0.7} 
        />
        
        {/* 3D模型 */}
        <ModelScene />
        
        {/* 轨道控制器 - 允许用户交互 */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      
      {/* 交互提示 */}
      {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded shadow">
        拖拽查看
      </div> */}
    </div>
  );
}

// 预加载模型
useGLTF.preload('/models/pom-pom__blockbench/scene.gltf'); 