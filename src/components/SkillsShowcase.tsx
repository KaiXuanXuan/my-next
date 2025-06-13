'use client';

import React from 'react';
import { Typography, Space, Tag } from 'antd';
import { motion } from 'framer-motion';

const { Title } = Typography;

interface Skill {
  category: string;
  skills: string[];
  color: string;
}

const skills: Skill[] = [
  {
    category: '前端开发',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Ant Design'],
    color: 'blue'
  },
  {
    category: '后端开发',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Redis'],
    color: 'green'
  },
  {
    category: '开发工具',
    skills: ['Git', 'Docker', 'VS Code', 'Webpack', 'Vite'],
    color: 'purple'
  },
  {
    category: '其他技能',
    skills: ['UI/UX 设计', '性能优化', '单元测试', 'CI/CD', '微服务'],
    color: 'orange'
  }
];

export const SkillsShowcase: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Title level={2} className="text-center mb-12">
        技能展示
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {skills.map((skillGroup, index) => (
          <motion.div
            key={skillGroup.category}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg p-6 shadow-sm"
          >
            <Title level={4} className="mb-4">
              {skillGroup.category}
            </Title>
            <Space wrap>
              {skillGroup.skills.map((skill) => (
                <Tag key={skill} color={skillGroup.color}>
                  {skill}
                </Tag>
              ))}
            </Space>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 