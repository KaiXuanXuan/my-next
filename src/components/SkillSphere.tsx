'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Group } from 'three';

interface SkillSphereProps {
  skills: string[];
}

function SkillPoints({ skills }: { skills: string[] }) {
  const groupRef = useRef<Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => {
        const phi = Math.acos(-1 + (2 * index) / skills.length);
        const theta = Math.sqrt(skills.length * Math.PI) * phi;
        const x = Math.cos(theta) * Math.sin(phi) * 2;
        const y = Math.sin(theta) * Math.sin(phi) * 2;
        const z = Math.cos(phi) * 2;

        return (
          <Text
            key={skill}
            position={[x, y, z]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {skill}
          </Text>
        );
      })}
    </group>
  );
}

export default function SkillSphere({ skills }: SkillSphereProps) {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <SkillPoints skills={skills} />
      </Canvas>
    </div>
  );
} 