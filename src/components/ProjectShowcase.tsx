'use client';

import React, { useRef } from 'react';
import { Card, Typography, Space, Tag } from 'antd';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
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

const projects: Project[] = [
  {
    id: 'blog',
    title: '个人博客与效率平台',
    description: [
      '以 Vue3 + Vite + Tailwind CSS + Shadcn UI 构建的高效个人博客与工作平台',
      '支持权限管理的一站式 Markdown 博客编辑与预览',
      '动效丰富的收藏夹系统，支持自定义分类、模糊搜索与高亮',
      '摸鱼热榜聚合页，实时展示微博、掘金、B站热搜',
      '智能 Agent 助手，自动生成周报/日报，集成待办与报告功能',
      '多实用小组件：下班倒计时、节假日提醒、天气、音乐播放器等',
      '项目注重交互体验与资源管理效率，极大提升日常工作与内容创作的便捷性',
    ],
    technologies: ['Vue3', 'Vite', 'Tailwind CSS', 'Shadcn UI', 'Node.js', 'Egg.js'],
    modelPath: '/models/pusheen_-_im_busy/scene.gltf',
    cameraPosition: [-4.5, 1.5, 6],
    cameraTarget: [-4.5, 0, 0],
    cameraFov: 50,
    backgroundColor: '#FFF9E3', // 米黄
    url: 'https://kaixx.top/',
  },
  {
    id: 'dingding',
    title: '高仿钉钉官网首页',
    description: [
      '高度还原钉钉官网首页，完整复刻其动画与布局，细节高度一致',
      '所有图片资源均通过爬虫自动获取，实现视觉与交互的极致还原',
      '导航栏支持吸顶与锚点跳转，带来便捷的分区浏览体验',
      'Banner 区域实现动态按钮，鼠标悬停可实时调整按钮大小，交互细腻',
      '品牌展示区支持无缝轮播、横向无限滚动及手动联动切换，动画流畅自然',
      '多种卡片栏支持动态数量横向/纵向展开，悬浮切换样式丰富，交互多样',
      '全部样式与动画均采用原生 CSS 及 Vue transition 过渡组件，保证高性能渲染',
    ],
    technologies: ['Vue3', 'Vite', 'CSS', 'Javascript'],
    modelPath: '/models/pusheen_vs_noodle/scene.gltf',
    cameraPosition: [-6, 3.5, 5],
    cameraTarget: [-4.8, 1, 0],
    cameraFov: 50,
    backgroundColor: '#FFE4E1', // 淡玫瑰
    url: 'https://ddingtalk.netlify.app/',
  },
  {
    id: 'music',
    title: '在线音乐平台',
    description: [
      '支持用户上传本地音乐文件，自动生成音乐列表，便于管理和播放',
      '内置高性能音乐播放器，支持在线播放、暂停、停止、音量调节等常用操作',
      '播放器界面简洁美观，支持实时进度显示和拖动切换播放进度',
      '每首音乐均支持用户评论，评论区实时刷新，提升互动体验',
      '所有数据存储与同步基于 Firebase 实现，保证多端数据一致性',
      '页面采用响应式设计，兼容桌面端与移动端访问',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    modelPath: '/models/halloween/scene.gltf',
    cameraPosition: [0, -1, 11],
    cameraTarget: [-0.2, -1.5, 0],
    cameraFov: 50,
    backgroundColor: '#FFF9E3', // 淡黄色
    url: 'https://kxmusic.netlify.app/  ',
  },
];

// 动态导入 Canvas 及相关依赖，避免初始包体过大
const LazyCanvas = dynamic(
  () => import('./ProjectShowcaseCanvas'),
  {
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-yellow-50 animate-pulse min-h-[200px]">
        <svg className="animate-spin h-10 w-10 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
      </div>),
    ssr: false
  }
);

interface ProjectCardProps {
  project: Project;
  index: number;
  handleReset: (controls: OrbitControlsImpl | null, project: Project) => void;
  controlsRefs: React.MutableRefObject<(OrbitControlsImpl | null)[]>;
  rowClass: string;
  initialX: number;
}

function ProjectCard(props: ProjectCardProps) {
  const { project, index, handleReset, controlsRefs, rowClass, initialX } = props;
  const { Title } = Typography;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
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
      <Card hoverable className={`w-full !cursor-default`} styles={{ body: { padding: 0 } }}>
        <div className={`flex flex-col ${rowClass} w-full rounded-lg overflow-hidden`}>
          <div className="w-full md:w-1/3 aspect-square min-h-[200px] bg-gray-100 flex-shrink-0">
            <div ref={ref} className="w-full h-full">
              {inView ? (
                <LazyCanvas project={project} index={index} handleReset={handleReset} controlsRefs={controlsRefs} />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-yellow-50 animate-pulse min-h-[200px]">3D加载中...</div>
              )}
            </div>
          </div>
          <div className="w-full md:flex-1 p-8 flex flex-col justify-start">
            <div className="mb-4 select-none" style={{ marginBottom: 16 }}>
              <span
                className="inline-flex items-center cursor-pointer"
                onClick={() => {
                  if (project.url) {
                    window.open(project.url, '_blank');
                  }
                }}
              >
                <Title
                  level={3}
                  className="!mb-0 !text-inherit hover:!text-blue-500 transition-colors duration-200 cursor-pointer"
                >
                  {project.title}
                </Title>
                <motion.button
                  className="!ml-2 px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 !text-yellow-700 border border-yellow-300 align-middle select-none pointer-events-none relative overflow-hidden inline-block"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                >
                  点击跳转
                  {/* 鼠标图案SVG - 右下角 */}
                  <svg
                    className="absolute -bottom-1 -right-1 w-3 h-3 text-gray-600 pointer-events-none"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                  </svg>
                  {/* 波纹效果 - 在按钮回弹时触发 */}
                  <motion.div
                    className="absolute inset-0 rounded bg-yellow-400/60 pointer-events-none"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1.5],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      repeatDelay: 3.8,
                      delay: 1.3, // 延迟1.3秒，在按钮回弹时触发
                      ease: "easeOut"
                    }}
                    style={{
                      transformOrigin: "center center",
                    }}
                  />
                </motion.button>
              </span>
            </div>
            <ul className="mb-6 space-y-3 text-gray-700 text-base">
              {project.description.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1 text-blue-400">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" fill="#60a5fa" />
                      <path d="M9.5 12.5l2 2 3-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
}

export const ProjectShowcase: React.FC = () => {
  const { Title } = Typography;
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
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              handleReset={handleReset}
              controlsRefs={controlsRefs}
              rowClass={rowClass}
              initialX={initialX}
            />
          );
        })}
      </div>
    </div>
  );
};
