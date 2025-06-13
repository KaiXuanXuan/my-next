'use client';

import React from 'react';
import { Card, Typography, Space, Tag } from 'antd';
import ProjectModel from './ProjectModel';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const { Title, Paragraph } = Typography;

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  modelPath?: string;
}

const projects: Project[] = [
  {
    id: 'portfolio',
    title: '个人作品集网站',
    description: '使用 Next.js、React Three Fiber 和 Tailwind CSS 构建的现代化个人作品集网站，展示个人技能和项目经验。',
    technologies: ['Next.js', 'React Three Fiber', 'Tailwind CSS', 'TypeScript'],
    modelPath: ''
  },
  {
    id: 'blog',
    title: '技术博客系统',
    description: '基于 Next.js 和 MDX 构建的技术博客系统，支持 Markdown 写作和代码高亮。',
    technologies: ['Next.js', 'MDX', 'Tailwind CSS', 'TypeScript'],
    modelPath: ''
  },
  {
    id: 'learning',
    title: '在线学习平台',
    description: '使用 Next.js 和 Ant Design 构建的在线学习平台，提供课程管理和学习进度跟踪功能。',
    technologies: ['Next.js', 'Ant Design', 'TypeScript', 'MongoDB'],
    modelPath: ''
  }
];

export const ProjectShowcase: React.FC = () => {
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
                y: 100
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                y: 0
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.2
              }}
            >
              <Card
                hoverable
                className="w-full"
                bodyStyle={{ padding: 0 }}
              >
                <div className={`flex flex-col ${rowClass} w-full`}>
                  <div className="w-full md:w-1/3 aspect-square min-h-[200px] bg-gray-100 flex-shrink-0">
                    <Canvas className="w-full h-full">
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} />
                      <ProjectModel modelPath={project.modelPath} />
                      <OrbitControls enableZoom={false} />
                    </Canvas>
                  </div>
                  <div className="w-full md:flex-1 p-8 flex flex-col justify-start">
                    <Title level={4} className="text-2xl mb-4">{project.title}</Title>
                    <Paragraph className="text-gray-600 mb-6 text-lg">
                      {project.description}
                    </Paragraph>
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