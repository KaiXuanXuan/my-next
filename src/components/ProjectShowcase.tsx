'use client';

import React, { useRef } from 'react';
import { Card, Typography, Space, Tag } from 'antd';
import ProjectModel from './ProjectModel';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

const { Title, Paragraph } = Typography;

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  modelPath?: string;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  cameraFov?: number;
  backgroundColor?: string;
  scale?: number;
}

const projects: Project[] = [
  {
    id: 'portfolio',
    title: '个人作品集网站',
    description: '使用 Next.js、React Three Fiber 和 Tailwind CSS 构建的现代化个人作品集网站，展示个人技能和项目经验。',
    technologies: ['Next.js', 'React Three Fiber', 'Tailwind CSS', 'TypeScript'],
    modelPath: '/models/pusheen_-_im_busy/scene.gltf',
    cameraPosition: [-4.5, 1.5, 6],
    cameraTarget: [-4.5, 0, 0],
    cameraFov: 50,
    backgroundColor: '#FFF9E3' // 米黄
  },
  {
    id: 'blog',
    title: '技术博客系统',
    description: '基于 Next.js 和 MDX 构建的技术博客系统，支持 Markdown 写作和代码高亮。',
    technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'TypeScript'],
    modelPath: '/models/pusheen_vs_noodle/scene.gltf',
    cameraPosition: [-6, 3.5, 5],
    cameraTarget: [-4.8, 1, 0],
    cameraFov: 50,
    backgroundColor: '#FFE4E1' // 淡玫瑰
  },
  {
    id: 'learning',
    title: '在线学习平台',
    description: '使用 Next.js 和 Ant Design 构建的在线学习平台，提供课程管理和学习进度跟踪功能。',
    technologies: ['Next.js', 'Ant Design', 'TypeScript', 'MongoDB'],
    modelPath: '/models/pusheen/scene.gltf',
    cameraPosition: [2, 4.5, 18],
    cameraTarget: [-2.5, 4, 0],
    cameraFov: 50,
    backgroundColor: '#E6F2FF', // 淡蓝
    scale: 0.05
  },
];

export const ProjectShowcase: React.FC = () => {
  // 用于存储每个 OrbitControls 的引用
  const controlsRefs = useRef<(OrbitControlsImpl | null)[]>([]);

  // 回正动画函数
  const handleReset = (controls: OrbitControlsImpl | null, project: Project) => {
    if (!controls) return;
    // 目标点
    const target = project.cameraTarget || [-4.5, 0, 0];
    // 相机位置
    const position = project.cameraPosition || [-4.5, 1.5, 6];
    // 动画帧数
    const frames = 100;
    let frame = 0;
    const startTarget = controls.target.clone();
    const startPos = controls.object.position.clone();
    const endTarget = { x: target[0], y: target[1], z: target[2] };
    const endPos = { x: position[0], y: position[1], z: position[2] };
    function animate() {
      frame++;
      const t = frame / frames;
      if (!controls) return;
      controls.target.lerpVectors(startTarget, endTarget, t);
      controls.object.position.lerpVectors(startPos, endPos, t);
      controls.update();
      if (frame < frames) {
        requestAnimationFrame(animate);
      } else {
        if (!controls) return;
        controls.target.set(endTarget.x, endTarget.y, endTarget.z);
        controls.object.position.set(endPos.x, endPos.y, endPos.z);
        controls.update();
      }
    }
    animate();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Title level={2} className="text-center mb-12">
        项目展示
      </Title>
      <div className="space-y-16">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          const initialX = isEven ? -100 : 100;
          const rowClass = isEven ? 'md:flex-row' : 'md:flex-row-reverse';
          return (
            <motion.div
              key={project.id}
              initial={{
                opacity: 0,
                x: initialX,
                y: 100,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.2,
              }}
            >
              <Card hoverable className="w-full" styles={{ body: { padding: 0 } }}>
                <div className={`flex flex-col ${rowClass} w-full rounded-lg overflow-hidden`}>
                  <div className="w-full md:w-1/3 aspect-square min-h-[200px] bg-gray-100 flex-shrink-0">
                    <Canvas className="w-full h-full" camera={{ position: project.cameraPosition || [-4.5, 1.5, 6], fov: project.cameraFov || 50 }}>
                      <color attach="background" args={[project.backgroundColor || '#FFF9E3']} />
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} intensity={700} />
                      <ProjectModel modelPath={project.modelPath} scale={project.scale || 1} />
                      <OrbitControls
                        enableZoom={false}
                        target={project.cameraTarget || [-4.5, 0, 0]}
                        ref={ref => { controlsRefs.current[index] = ref; }}
                        onEnd={() => handleReset(controlsRefs.current[index], project)}
                      />
                    </Canvas>
                  </div>
                  <div className="w-full md:flex-1 p-8 flex flex-col justify-start">
                    <Title level={4} className="text-2xl mb-4">
                      {project.title}
                    </Title>
                    <Paragraph className="text-gray-600 mb-6 text-lg">{project.description}</Paragraph>
                    <Space wrap>
                      {project.technologies.map((tech) => (
                        <Tag key={tech} color="blue" className="text-base px-3 py-1">
                          {tech}
                        </Tag>
                      ))}
                    </Space>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
