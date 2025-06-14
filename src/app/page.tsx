'use client';

import { ProfileSection } from '@/components/ProfileSection';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { SkillsShowcase } from '@/components/SkillsShowcase';

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="resume" className="py-16">
        <ProfileSection />
      </section>

      <section id="skills" className="py-16">
        <SkillsShowcase />
      </section>

      <section id="projects" className="py-16 bg-gray-50">
        <ProjectShowcase />
      </section>
    </main>
  );
}
