'use client';

import { ProfileSection } from '@/components/ProfileSection';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { SkillsShowcase } from '@/components/SkillsShowcase';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* 个人简历区块 */}
      <section id="resume" className="relative">
        <ProfileSection />
      </section>

      {/* 技能展示区块 */}
      <section id="skills" className="relative bg-gradient-to-br from-gray-50 to-slate-100 py-20">
        <div className="relative">
          <SkillsShowcase />
        </div>
      </section>

      {/* 项目展示区块 */}
      <section id="projects" className="relative bg-gradient-to-br from-white to-gray-50 py-20">
        <div className="relative">
          <ProjectShowcase />
        </div>
      </section>
    </main>
  );
}
