import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Vector from './Vector';

const DotProductVisualizer: React.FC = () => {
  const [vecA, setVecA] = useState(new THREE.Vector3(1, 2, 3));
  const [vecB, setVecB] = useState(new THREE.Vector3(4, 5, 6));
  const [isDraggingEnabled, setIsDraggingEnabled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey) {
        setIsDraggingEnabled(true);
      }
    };

    const handleKeyUp = () => {
      setIsDraggingEnabled(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Vector
        vector={vecA}
        color="orange"
        onDrag={setVecA}
        isDraggingEnabled={isDraggingEnabled}
      />
      <Vector
        vector={vecB}
        color="purple"
        onDrag={setVecB}
        isDraggingEnabled={isDraggingEnabled}
      />
    </Canvas>
  );
};

export default DotProductVisualizer;
