'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D模型组件
function ModelScene() {
  const modelRef = useRef<THREE.Group>(null);
  
  // 始终调用hooks
  const { scene } = useGLTF('/models/pom-pom__blockbench/scene.gltf');
  
  // 递归设置所有 mesh 的 castShadow
  useEffect(() => {
    if (scene) {
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          (obj as THREE.Mesh).castShadow = true;
        }
      });

      // 沿y轴旋转180度，把模型转到正面
      if (modelRef.current) {
        modelRef.current.rotation.y = Math.PI;
      }
    }
  }, [scene]);
  
  useFrame(() => {
    if (modelRef.current) {
      // 缓慢自动旋转
      modelRef.current.rotation.y += 0.001;
    }
  });

  if (!scene) {
    return null;
  }

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

// 加载状态组件
function LoadingFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <svg className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <p className="text-blue-600 text-sm font-medium">3D头像加载中...</p>
      </div>
    </div>
  );
}

// 错误状态组件
function ErrorFallback() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">
          头像加载失败
        </p>
      </div>
    </div>
  );
}

export function Avatar3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [renderError, setRenderError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // 检测WebGL支持
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        setHasWebGL(!!gl);
      } catch {
        setHasWebGL(false);
      }
    };
    
    checkMobile();
    checkWebGL();
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

  // WebGL不支持时的降级
  if (hasWebGL === false) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center text-white text-6xl font-bold shadow-lg">
        👨‍💻
      </div>
    );
  }

  // 渲染错误时的降级
  if (renderError) {
    return <ErrorFallback />;
  }

  // WebGL检测中
  if (hasWebGL === null) {
    return <LoadingFallback />;
  }

  return (
    <div className="w-full h-full relative rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        shadows
        onError={() => setRenderError(true)}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "default" // 头像使用默认性能模式，避免与项目展示冲突
        }}
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
        
        {/* 3D模型 - 用Suspense包装 */}
        <Suspense fallback={null}>
          <ModelScene />
        </Suspense>
        
        {/* 轨道控制器 - 允许用户交互 */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

// 预加载模型，但延迟执行避免冲突，支持Draco压缩
if (typeof window !== 'undefined') {
  setTimeout(() => {
    try {
      // useGLTF.preload 自动支持 Draco 压缩的模型
      useGLTF.preload('/models/pom-pom__blockbench/scene.gltf');
    } catch (error) {
      console.warn('头像模型预加载失败:', error);
    }
  }, 500); // 延迟500毫秒预加载，避免与其他3D组件冲突
} 