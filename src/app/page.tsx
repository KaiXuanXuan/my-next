'use client';

import { AwardSection } from '@/components/AwardSection';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { SkillsShowcase } from '@/components/SkillsShowcase';

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="resume" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg p-6">
            <h1 className="text-4xl font-bold text-center mb-8">个人简历</h1>
            <p className="text-lg text-gray-600 text-center mb-12">
              我是一名热爱前端开发和 3D 技术的开发者，致力于创造优秀的用户体验。
            </p>
            <AwardSection />
          </div>
        </div>
      </section>

      <section id="skills" className="py-16">
        <SkillsShowcase />
      </section>

      <section id="projects" className="py-16">
        <ProjectShowcase />
      </section>
    </main>
  );
}
