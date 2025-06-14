'use client';

import dynamic from 'next/dynamic';
import { AwardSection } from './AwardSection';

// 动态加载3D组件，避免SSR问题
const Avatar3D = dynamic(() => import('./Avatar3D').then(mod => ({ default: mod.Avatar3D })), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-400">加载中...</div>
    </div>
  ),
});

export function ProfileSection() {
  const personalInfo = {
    name: "黄凯旋",
    email: "1749043188@qq.com",
    phone: "+86 182-5795-2097",
    location: "广东省广州市",
    description: "我是一名热爱钻研新技术，充满探索欲望的前端开发者"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-lg p-6">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">个人简历</h1>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          {/* 左侧：头像区域 */}
          <div className="flex justify-center">
            <div className="w-80 h-80">
              <Avatar3D />
            </div>
          </div>

          {/* 右侧：个人信息 */}
          <div className="space-y-8">
            {/* 基本信息 */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {personalInfo.name}
              </h2>
            </div>

            {/* 关于我 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-1 h-6 bg-blue-500 mr-3 rounded"></span>
                关于我
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {personalInfo.description}
              </p>
            </div>

            {/* 联系方式 */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-1 h-6 bg-purple-500 mr-3 rounded"></span>
                联系方式
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <span className="w-16 text-sm font-medium">邮箱：</span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-16 text-sm font-medium">电话：</span>
                  <a
                    href={`tel:${personalInfo.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="w-16 text-sm font-medium">地址：</span>
                  <span>{personalInfo.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 获奖经历部分 */}
        <AwardSection />
      </div>
    </div>
  );
} 