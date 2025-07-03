// src/pages/VRPage.jsx
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';

function Box(props) {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame(() => (meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01));

  return (
    <mesh {...props} ref={meshRef} scale={active ? 1.5 : 1} onClick={() => setActive(!active)} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function VRPage() {
  return (
    <div style={{ height: '70vh', width: '100%', position: 'relative' }}>
      <h2 className='mb-3'>WebXR Virtual Reality Scene</h2>
      <p>Click "Enter VR" below if you have a VR headset connected.</p>
      
      {/* The VRButton is positioned absolutely to overlay the canvas */}
      <div style={{ position: 'absolute', top: '80px', left: '20px', zIndex: 1 }}>
        <VRButton />
      </div>

      <Canvas style={{ background: '#f0f0f0', borderRadius: '8px' }}>
        <XR>
          <Controllers />
          <Hands />
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Box position={[-1.2, 0.5, -3]} />
          <Box position={[1.2, 0.5, -3]} />
        </XR>
      </Canvas>
      <div className="alert alert-info mt-3">
        <strong>How it works:</strong> This canvas renders a 3D scene. The `VRButton` handles entering/exiting VR in your browser.
      </div>
    </div>
  );
}

export default VRPage;