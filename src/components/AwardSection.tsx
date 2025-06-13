'use client';

import React from 'react';
import { Typography, Tag } from 'antd';
import { motion } from 'framer-motion';

const { Title } = Typography;

const awards = [
  {
    title: '2024美国大学生数学建模竞赛',
    award: '国际二等奖',
    tags: ['数学建模', '国际竞赛', '团队协作']
  },
  {
    title: '2024亚太地区大学生数学建模竞赛',
    award: '二等奖',
    tags: ['数学建模', '亚太地区', '数据分析']
  }
];

export const AwardSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Title level={2} className="text-center mb-12">
        获奖经历
      </Title>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {awards.map((award, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center justify-center">
                <span className="text-3xl mr-3">🏆</span>
                <div>
                  <Title level={4} className="mb-2 !text-lg">{award.title}</Title>
                  <div className="flex flex-wrap gap-2">
                    <Tag color="gold" className="text-sm">
                      {award.award}
                    </Tag>
                    {award.tags.map((tag, tagIndex) => (
                      <Tag key={tagIndex} color="blue" className="text-sm">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}; 