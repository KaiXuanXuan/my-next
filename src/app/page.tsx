'use client';

import { Button, Card, Space } from 'antd';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="欢迎使用">
          <p>这是一个使用 Next.js、Ant Design 和 React Three Fiber 的示例页面</p>
          <Button type="primary">点击我</Button>
        </Card>
        
        <Card title="3D 场景">
          <div style={{ height: '400px' }}>
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Box />
              <OrbitControls />
            </Canvas>
          </div>
        </Card>
      </Space>
    </main>
  );
}
